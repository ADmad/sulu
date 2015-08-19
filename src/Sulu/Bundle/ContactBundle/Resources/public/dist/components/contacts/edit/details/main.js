define(["config","widget-groups","services/sulucontact/contact-manager"],function(a,b,c){"use strict";var d="#contact-form",e=["urls","emails","faxes","phones","notes"],f={tagsId:"#tags",addressAddId:"#address-add",bankAccountAddId:"#bank-account-add",addAddressWrapper:".grid-row",addBankAccountsWrapper:".grid-row",editFormSelector:"#contact-edit-form",avatarImageId:"#avatar",avatarDropzoneSelector:"#avatar-dropzone",avatarThumbnailFormat:"400x400"},g={addBankAccountsIcon:['<div class="grid-row">','   <div class="grid-col-12">','       <div id="bank-account-add" class="addButton bank-account-add m-left-140"></div>',"   </div>","</div>"].join(""),addAddressesIcon:['<div class="grid-row">','   <div class="grid-col-12">','       <div id="address-add" class="addButton address-add m-left-140"></div>',"   </div>","</div>"].join("")};return{view:!0,tabOptions:{noTitle:!0},layout:function(){return{content:{width:"max",leftSpace:!1,topSpace:!1,rightSpace:!1},sidebar:{width:"max",cssClasses:"sidebar-padding-50"}}},templates:["/admin/contact/template/contact/form"],initialize:function(){this.data=this.options.data(),this.autoCompleteInstanceName="accounts-",this.dfdAllFieldsInitialized=this.sandbox.data.deferred(),this.dfdListenForChange=this.sandbox.data.deferred(),this.dfdFormIsSet=this.sandbox.data.deferred(),this.dfdBirthdayIsSet=this.sandbox.data.deferred(),this.sandbox.data.when(this.dfdListenForChange,this.dfdBirthdayIsSet).then(function(){this.dfdAllFieldsInitialized.resolve()}.bind(this)),this.render(),this.listenForChange(),this.data&&this.data.id&&b.exists("contact-detail")&&this.initSidebar("/admin/widget-groups/contact-detail?contact=",this.data.id)},destroy:function(){this.sandbox.emit("sulu.header.toolbar.item.hide","disabler"),this.cleanUp()},initSidebar:function(a,b){this.sandbox.emit("sulu.sidebar.set-widget",a+b)},render:function(){this.sandbox.emit(this.options.disablerToggler+".change",this.data.disabled),this.sandbox.emit("sulu.header.toolbar.item.show","disabler"),this.sandbox.once("sulu.contacts.set-defaults",this.setDefaults.bind(this)),this.sandbox.once("sulu.contacts.set-types",this.setTypes.bind(this)),this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/contact/template/contact/form")),this.sandbox.on("husky.dropdown.type.item.click",this.typeClick.bind(this));var a=this.initContactData();this.companyInstanceName="companyContact"+a.id,this.initForm(a),this.initAvatarContainer(a),this.setTags(a),this.bindCustomEvents(),this.bindTagEvents(a)},setTags:function(){var a=this.sandbox.util.uniqueId();this.data.id&&(a+="-"+this.data.id),this.autoCompleteInstanceName+=a,this.dfdFormIsSet.then(function(){this.sandbox.start([{name:"auto-complete-list@husky",options:{el:"#tags",instanceName:this.autoCompleteInstanceName,getParameter:"search",itemsKey:"tags",remoteUrl:"/admin/api/tags?flat=true&sortBy=name&searchFields=name",completeIcon:"tag",noNewTags:!0}}])}.bind(this))},initAvatarContainer:function(b){b.avatar?this.updateContactAvatar(b.avatar.id,b.avatar.thumbnails[f.avatarThumbnailFormat]):this.sandbox.dom.attr(f.avatarImageId,"src",a.get("sulucontact.contacts.default.avatar").url);var c=function(){var a=this.sandbox.dom.data(f.avatarImageId,"mediaId"),c=a?"/admin/api/media/"+a+"?action=new-version":"/admin/api/media?collection=1";return b.fullName&&(c=c+"&title="+encodeURIComponent(b.fullName),c=c+"&locale="+encodeURIComponent(this.sandbox.sulu.user.locale)),c}.bind(this);this.sandbox.start([{name:"dropzone@husky",options:{el:f.avatarDropzoneSelector,instanceName:"contact-avatar",titleKey:"",descriptionKey:"contact.contacts.avatar-dropzone-text",url:c,skin:"overlay",method:"POST",paramName:"fileVersion",showOverlay:!1,maxFiles:1}}])},updateContactAvatar:function(a,b){this.sandbox.dom.data(f.avatarImageId,"mediaId",a),this.sandbox.dom.attr(f.avatarImageId,"src",b)},bindTagEvents:function(a){a.tags&&a.tags.length>0?(this.sandbox.on("husky.auto-complete-list."+this.autoCompleteInstanceName+".initialized",function(){this.sandbox.emit("husky.auto-complete-list."+this.autoCompleteInstanceName+".set-tags",a.tags)}.bind(this)),this.sandbox.on("husky.auto-complete-list."+this.autoCompleteInstanceName+".items-added",function(){this.dfdListenForChange.resolve()}.bind(this))):this.dfdListenForChange.resolve()},setDefaults:function(a){this.defaultTypes=a},setTypes:function(a){this.fieldTypes=a},setFormData:function(a,b){this.numberOfBankAccounts=a.bankAccounts?a.bankAccounts.length:0,this.updateBankAccountAddIcon(this.numberOfBankAccounts),this.sandbox.emit("sulu.contact-form.add-collectionfilters",d),this.sandbox.form.setData(d,a).then(function(){b?this.sandbox.start(d):this.sandbox.start("#contact-fields"),this.sandbox.emit("sulu.contact-form.add-required",["email"]),this.sandbox.emit("sulu.contact-form.content-set"),this.dfdFormIsSet.resolve()}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},initForm:function(b){var c=a.get("sulucontact.components.autocomplete.default.account");c.el="#company",c.value=b.account?b.account:"",c.instanceName=this.companyInstanceName,this.sandbox.start([{name:"auto-complete@husky",options:c}]),this.numberOfAddresses=b.addresses.length,this.updateAddressesAddIcon(this.numberOfAddresses),this.sandbox.on("sulu.contact-form.initialized",function(){var a=this.sandbox.form.create(d);a.initialized.then(function(){this.setFormData(b,!0)}.bind(this))}.bind(this)),this.sandbox.start([{name:"contact-form@sulucontact",options:{el:f.editFormSelector,fieldTypes:this.fieldTypes,defaultTypes:this.defaultTypes}}])},updateAddressesAddIcon:function(a){var b,c=this.$find(f.addressAddId);a&&a>0&&0===c.length?(b=this.sandbox.dom.createElement(g.addAddressesIcon),this.sandbox.dom.after(this.$find("#addresses"),b)):0===a&&c.length>0&&(this.sandbox.dom.remove(this.sandbox.dom.closest(c,f.addAddressWrapper)),this.sandbox.emit("sulu.contact-form.update.addAddressLabel","#addresses"))},bindCustomEvents:function(){this.sandbox.on("sulu.contact-form.added.address",function(){this.numberOfAddresses+=1,this.updateAddressesAddIcon(this.numberOfAddresses)},this),this.sandbox.on("sulu.contact-form.removed.address",function(){this.numberOfAddresses-=1,this.updateAddressesAddIcon(this.numberOfAddresses)},this),this.sandbox.on("sulu.tab.save",this.save,this),this.sandbox.on("husky.input.birthday.initialized",function(){this.dfdBirthdayIsSet.resolve()},this),this.sandbox.once("husky.select.position-select.initialize",function(){this.sandbox.dom.find("#"+this.companyInstanceName).val()||this.enablePositionDropdown(!1)},this),this.sandbox.on("sulu.contact-form.added.bank-account",function(){this.numberOfBankAccounts+=1,this.updateBankAccountAddIcon(this.numberOfBankAccounts)},this),this.sandbox.on("sulu.contact-form.removed.bank-account",function(){this.numberOfBankAccounts-=1,this.updateBankAccountAddIcon(this.numberOfBankAccounts)},this),this.initializeDropDownListener("title-select","api/contact/titles"),this.initializeDropDownListener("position-select","api/contact/positions"),this.sandbox.on("husky.toggler.sulu-toolbar.changed",this.toggleDisableContact.bind(this)),this.sandbox.on("husky.dropzone.contact-avatar.success",function(a,b){this.sandbox.dom.data(f.avatarImageId,"mediaId")?this.sandbox.emit("sulu.labels.success.show","contact.contacts.avatar.saved"):this.data.id&&(this.sandbox.util.extend(!0,this.data,{avatar:{id:b.id}}),c.saveAvatar(this.data).then(function(){this.sandbox.emit("sulu.tab.data-changed",this.data)}.bind(this))),this.updateContactAvatar(b.id,b.thumbnails[f.avatarThumbnailFormat])},this)},toggleDisableContact:function(a){this.data.disabled=a,this.sandbox.emit("sulu.tab.dirty")},cleanUp:function(){this.sandbox.stop(f.editFormSelector)},initContactData:function(){var a=this.data;return this.sandbox.util.foreach(e,function(b){a.hasOwnProperty(b)||(a[b]=[])}),a.emails=this.fillFields(a.emails,1,{id:null,email:"",emailType:this.defaultTypes.emailType}),a.phones=this.fillFields(a.phones,1,{id:null,phone:"",phoneType:this.defaultTypes.phoneType}),a.faxes=this.fillFields(a.faxes,1,{id:null,fax:"",faxType:this.defaultTypes.faxType}),a.notes=this.fillFields(a.notes,1,{id:null,value:""}),a.urls=this.fillFields(a.urls,0,{id:null,url:"",urlType:this.defaultTypes.urlType}),a},typeClick:function(a,b){b.find("*.type-value").data("element").setValue(a)},fillFields:function(a,b,c){var d,e=-1,f=a.length;for(b>f&&(f=b);++e<f;)d=e+1>b?{}:{permanent:!0},a[e]?a[e].attributes=d:(a.push(c),a[a.length-1].attributes=d);return a},save:function(){if(this.sandbox.form.validate(d)){var a=this.sandbox.util.extend(!1,{},this.data,this.sandbox.form.getData(d));""===a.id&&delete a.id,a.tags=this.sandbox.dom.data(this.$find(f.tagsId),"tags"),a.avatar={id:this.sandbox.dom.data(f.avatarImageId,"mediaId")},a.account={id:this.sandbox.dom.attr("#"+this.companyInstanceName,"data-id")},this.sandbox.emit("sulu.tab.saving"),c.save(a).then(function(a){this.data=a;var b=this.initContactData();this.setFormData(b),this.sandbox.emit("sulu.tab.saved",a,!0)}.bind(this))}},initializeDropDownListener:function(a){var b="husky.select."+a;this.sandbox.on(b+".selected.item",function(a){a>0&&this.sandbox.emit("sulu.tab.dirty")}.bind(this)),this.sandbox.on(b+".deselected.item",function(){this.sandbox.emit("sulu.tab.dirty")}.bind(this)),this.sandbox.on(b+".delete",this.deleteSelectData.bind(this,a)),this.sandbox.on(b+".save",this.saveSelectData.bind(this,a))},saveSelectData:function(a,b){var d="title-select"===a?c.saveTitles:c.savePositions;d(b).then(function(b){this.sandbox.emit("husky.select."+a+".update",b,[b[b.length-1]],!0,!0)}.bind(this))},deleteSelectData:function(a,b){var d="title-select"===a?c.deleteTitle:c.deletePosition;this.sandbox.util.foreach(b,function(a){d(a)}.bind(this))},enablePositionDropdown:function(a){a?this.sandbox.emit("husky.select.position-select.enable"):this.sandbox.emit("husky.select.position-select.disable")},listenForChange:function(){this.sandbox.data.when(this.dfdAllFieldsInitialized).then(function(){this.sandbox.dom.on(d,"change keyup",function(){this.sandbox.emit("sulu.tab.dirty")}.bind(this),"select, input, textarea"),this.sandbox.on("sulu.contact-form.changed",function(){this.sandbox.emit("sulu.tab.dirty")}.bind(this)),this.sandbox.dom.on("#company","keyup",function(a){a.target.value||this.enablePositionDropdown(!1)}.bind(this)),this.companySelected="husky.auto-complete."+this.companyInstanceName+".select",this.sandbox.on(this.companySelected,function(){this.enablePositionDropdown(!0)}.bind(this))}.bind(this)),this.sandbox.on("husky.select.form-of-address.selected.item",function(){this.sandbox.emit("sulu.tab.dirty")}.bind(this))},updateBankAccountAddIcon:function(a){var b,c=this.$find(f.bankAccountAddId);a&&a>0&&0===c.length?(b=this.sandbox.dom.createElement(g.addBankAccountsIcon),this.sandbox.dom.after(this.$find("#bankAccounts"),b)):0===a&&c.length>0&&this.sandbox.dom.remove(this.sandbox.dom.closest(c,f.addBankAccountsWrapper))}}});
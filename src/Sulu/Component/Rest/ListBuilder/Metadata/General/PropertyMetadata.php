<?php
/*
 * This file is part of Sulu.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Rest\ListBuilder\Metadata\General;

use Metadata\PropertyMetadata as BasePropertyMetadata;

/**
 * Container for property-metadata.
 */
class PropertyMetadata extends BasePropertyMetadata
{
    /**
     * @var string
     */
    private $translation;

    /**
     * @var bool
     */
    private $disabled = false;

    /**
     * @var bool
     */
    private $default = false;

    /**
     * @var string
     */
    private $type = 'string';

    /**
     * @var string
     */
    private $width = '';

    /**
     * @var string
     */
    private $minWidth = '';

    /**
     * @var bool
     */
    private $sortable = true;

    /**
     * @var bool
     */
    private $editable = false;

    /**
     * @var string
     */
    private $cssClass = '';

    public function __construct($class, $name)
    {
        $this->class = $class;
        $this->name = $name;

        // default for translation can be overwritten by setter
        $this->translation = ucfirst($name);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getTranslation()
    {
        return $this->translation;
    }

    /**
     * @param string $translation
     */
    public function setTranslation($translation)
    {
        $this->translation = $translation;
    }

    /**
     * @return boolean
     */
    public function isDisabled()
    {
        return $this->disabled;
    }

    /**
     * @param boolean $disabled
     */
    public function setDisabled($disabled)
    {
        $this->disabled = $disabled;
    }

    /**
     * @return boolean
     */
    public function isDefault()
    {
        return $this->default;
    }

    /**
     * @param boolean $default
     */
    public function setDefault($default)
    {
        $this->default = $default;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return int
     */
    public function getWidth()
    {
        return $this->width;
    }

    /**
     * @param int $width
     */
    public function setWidth($width)
    {
        $this->width = $width;
    }

    /**
     * @return int
     */
    public function getMinWidth()
    {
        return $this->minWidth;
    }

    /**
     * @param int $minWidth
     */
    public function setMinWidth($minWidth)
    {
        $this->minWidth = $minWidth;
    }

    /**
     * @return boolean
     */
    public function isSortable()
    {
        return $this->sortable;
    }

    /**
     * @param boolean $sortable
     */
    public function setSortable($sortable)
    {
        $this->sortable = $sortable;
    }

    /**
     * @return boolean
     */
    public function isEditable()
    {
        return $this->editable;
    }

    /**
     * @param boolean $editable
     */
    public function setEditable($editable)
    {
        $this->editable = $editable;
    }

    /**
     * @return string
     */
    public function getCssClass()
    {
        return $this->cssClass;
    }

    /**
     * @param string $cssClass
     */
    public function setCssClass($cssClass)
    {
        $this->cssClass = $cssClass;
    }

    /**
     * {@inheritdoc}
     */
    public function serialize()
    {
        return serialize(
            [
                $this->class,
                $this->name,
                $this->translation,
                $this->disabled,
                $this->default,
                $this->type,
                $this->width,
                $this->minWidth,
                $this->sortable,
                $this->editable,
                $this->cssClass,
            ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function unserialize($str)
    {
        list(
            $this->class,
            $this->name,
            $this->translation,
            $this->disabled,
            $this->default,
            $this->type,
            $this->width,
            $this->minWidth,
            $this->sortable,
            $this->editable,
            $this->cssClass,
            ) = unserialize($str);
    }
}
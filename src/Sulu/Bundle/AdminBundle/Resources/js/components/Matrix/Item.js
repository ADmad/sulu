// @flow
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import matrixStyles from './matrix.scss';

type Props = {
    icon: string,
    name: string,
    onChange?: (name: string, value: boolean) => void,
    title?: string,
    value: boolean,
};

export default class Item extends React.PureComponent<Props> {
    static defaultProps = {
        value: false,
    };

    handleClick = () => {
        const {
            name,
            onChange,
            value,
        } = this.props;

        if (!onChange) {
            return;
        }

        onChange(name, !value);
    };

    render() {
        const {
            icon,
            name,
            title,
            value,
        } = this.props;
        const itemClass = classNames(
            matrixStyles.item,
            {
                [matrixStyles.selected]: value,
            }
        );

        const itemTitle = title ? title : name.charAt(0).toUpperCase() + name.slice(1);

        return (
            <div className={itemClass} onClick={this.handleClick} title={itemTitle}>
                <Icon name={icon} />
            </div>
        );
    }
}

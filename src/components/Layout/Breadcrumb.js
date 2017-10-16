import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
const { Item } = Breadcrumb;

class BreadcrumbTip extends Component {

    renderBreadcrumb() {
        const { breadcrumb } = this.props;
        const list = [];
        for (let i = 0; i < breadcrumb.length; i++) {
            list[i] = (
                <Breadcrumb.Item>
                    {breadcrumb[i]}
                </Breadcrumb.Item>
            )
        }
    }

    render() {
        return (
            <Breadcrumb style={{ margin: '12px 0' }}>
                {this.renderBreadcrumb()}
            </Breadcrumb>
        );
    }
}

export default BreadcrumbTip;

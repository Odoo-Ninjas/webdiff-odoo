/** @odoo-module **/

import { registry } from '@web/core/registry';
import { CharField } from "@web/views/fields/char/char_field";
const { Component, onWillUpdateProps, useRef, onMounted, useState } = owl;

export class DiffView extends CharField {

    setup() {
        super.setup();
        this.iframe = useRef('iframe1');
        onWillUpdateProps((nextProps) => this.putHtmlIntoIFrame(nextProps));
    }
    putHtmlIntoIFrame(nextProps) {
        const val = nextProps.value || "";
        const $el = this.iframe.el;
        const doc = $el.contentWindow.document;
        doc.open();
        doc.write(val);
        doc.close();
    }
    get formattedValue() {
        debugger;
        return this.props.value;
    }
}

// DiffView.props = {
//     text: { type: String },
// };
DiffView.template = "diff_view.widget";
DiffView.supportedTypes = ["char", "text"];
registry.category("fields").add("diff_view", DiffView);

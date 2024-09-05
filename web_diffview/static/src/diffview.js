import { registry } from '@web/core/registry';
import { Component } from '@odoo/owl';

class DiffView extends Component {
    static template = 'diff_view.widget';

    setup() {
        this.diffString = this.props.text || "Hello, Odoo 16!";
    }
    format() {
        var parts = this.diffString.split("!#!#!#!##!#!#!#!!!#######!!!!!!#!#!#!");
        if (parts.length <= 1) {
            $(targetElement).html("no diff");
            return;
        }
        var targetElement = this.$el[0];
        var configuration = {
            drawFileList: false,
            //matching: 'lines'
            highlight: true,
            //outputFormat: 'side-by-side',
            outputFormat: 'line-by-line',
        };
        var diff = JsDiff['diffWords'](parts[0], parts[1]);
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < diff.length; i++) {

            if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
                var swap = diff[i];
                diff[i] = diff[i + 1];
                diff[i + 1] = swap;
            }

            var node;
            if (diff[i].removed) {
                node = document.createElement('del');
                node.appendChild(document.createTextNode(diff[i].value));
            } else if (diff[i].added) {
                node = document.createElement('ins');
                node.appendChild(document.createTextNode(diff[i].value));
            } else {
                node = document.createTextNode(diff[i].value);
            }
            fragment.appendChild(node);
        }

        $(targetElement).html("");
        $("<pre/>").appendTo($(targetElement))[0].appendChild(fragment);
    }
}

SimpleStringWidget.props = {
    text: { type: String },
};
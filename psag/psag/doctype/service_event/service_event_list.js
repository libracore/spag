// Copyright (c) 2024, libracore and contributors
// For license information, please see license.txt

// render
frappe.listview_settings['Service Event'] = {
    get_indicator: function(doc) {
        var status_color = {
                    "For planning": "red",
                    "Planned": "orange",
                    "In progress": "green",
                    "Completed": "grey"
        };
        return [__(doc.status), status_color[doc.status], "status,=,"+doc.status];
    }
};

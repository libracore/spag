// Copyright (c) 2024, libracore and contributors
// For license information, please see license.txt

// render
frappe.listview_settings['Service Event'] = {
    get_indicator: function(doc) {
        var status_color = {
                    "For planning": "darkgrey",
					"Planned": "orange",
					"In progress": "yellow",
					"Completed": "green"
		};
        return [__(doc.status), status_color[doc.status], "status,=,"+doc.status];
    }
};

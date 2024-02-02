// Copyright (c) 2024, libracore AG and contributors
// For license information, please see license.txt

frappe.ui.form.on('Inspection', {
	validate: function(frm) {
		frappe.call({
			'method': 'psag.psag.doctype.inspection.inspection.set_facility_information',
			'args': {
				'facility': frm.doc.facility,
				'area': frm.doc.area,
				'volume': frm.doc.volume
			},
			'callback': function(response) {
				console.log("Hoi Maschine");
			}
		});
	}
});

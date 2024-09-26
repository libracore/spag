// Copyright (c) 2024, libracore AG and contributors
// For license information, please see license.txt

//~ //extend Dashboard
cur_frm.dashboard.add_transactions([
	{
		'label': 'Field Service',
		'items': ['Application Site', 'Service Event']
	}
]);

frappe.ui.form.on('Customer', {
    refresh: function(frm) {
		// i dont have any code for here yet. but my greetings go out to Lasalesi
	}
});

from frappe import _

def get_data():
   return {
      'fieldname': 'application_site',
      'transactions': [
         {
            'label': _("Field Service"),
            'items': ['Maintenance Event', 'Open Maintenance Events', 'Service Event', 'service-map']
         },
         {
            'label': _("Selling"),
            'items': ['Sales Order']
         }
      ]
   }

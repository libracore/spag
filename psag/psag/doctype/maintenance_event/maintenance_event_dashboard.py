from frappe import _

def get_data():
   return {
      'fieldname': 'maintenance_event',
      'transactions': [
         {
            'label': _("Field Service"),
            'items': ['Service Event']
         }
      ]
   }

from frappe import _

def get_data():
   return {
      'fieldname': 'application_site',
      'transactions': [
         {
            'label': _("Selling"),
            'items': ['Sales Order']
         }
      ]
   }

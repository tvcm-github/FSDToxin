import '../text-field/text-field'
import './dropdown.scss'

$('.range-date').datepicker({clearButton: true, range: true, multipleDatesSeparator: ' - ', dateFormat: 'dd M', inline: true})
$('.separated-date').datepicker({clearButton: true, range: true, multipleDatesSeparator: ' - ', dateFormat: 'dd.mm.yyyy', inline: true})

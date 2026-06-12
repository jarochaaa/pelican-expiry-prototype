export type Lang = 'en' | 'pt'

type Dict = Record<string, string>

const en: Dict = {
  // Common
  'common.done': 'Done',
  'common.submit': 'Submit',
  'common.apply': 'Apply',
  'common.cancel': 'Cancel',
  'common.edit': 'Edit',
  'common.back': 'Back',

  // Bottom nav
  'nav.orders': 'Orders',
  'nav.audits': 'Audits',
  'nav.receiving': 'Receiving',
  'nav.more': 'More',

  // Audits screen
  'audits.title': 'Audits',
  'audits.profileAria': 'Profile',
  'audits.helpAria': 'Help',
  'audits.tab.count': 'Count Tasks',
  'audits.tab.expiry': 'Expiry Tasks',
  'audits.seg.cycle': 'Cycle Count',
  'audits.seg.full': 'Full Store Count',
  'audits.inProgress': 'In progress',
  'audits.toDo': 'To do',
  'audits.tag.expiryChecks': 'Expiry Checks',
  'audits.tag.outOfDate': 'Out of Date Checks',
  'audits.productsCount': '{n} products',

  // Task detail
  'task.prefix': 'Task',
  'task.toCheck': 'To check',
  'task.checked': 'Checked',
  'task.finishTask': 'Finish Task',
  'task.notFound': 'Not found',
  'task.newLocationToast': 'New location was added to the list',
  'task.goTo': 'Go to {location}',
  'task.productSingular': '{n} product',
  'task.productPlural': '{n} products',

  // Product detail / inputs
  'product.inputQuantity': 'Input Quantity',
  'product.inputQuantityLower': 'Input quantity',
  'product.addBatches': 'Add batches',
  'product.confirmMismatch': 'Confirm mismatch',
  'product.batch': 'Batch',
  'product.quantity': 'Quantity',
  'product.expiryDate': 'Expiry date',
  'product.location': 'Location',
  'product.expiration': 'Expiration: {date}',
  'product.expDate': 'Exp. Date: {date}',
  'product.items': '{n} items',
  'product.itemsRemoved': '{n} items removed',
  // Alerts
  'product.alert.countAllOn': 'Count all units expiring on {date}',
  'product.alert.removeCount': 'Remove & Count all expired units of this product',
  'product.alert.timeToCheckMissing':
    'Time to check missing units!\nCount all units with expiration date: {date} within this location {location}',
  'product.alert.mismatchTitle': "Expiration date doesn't match yet",
  'product.alert.mismatchBody':
    'Please, check and add all expiration batches for location: {location}',
  'product.alert.addOtherTitle': 'Add other expiry dates found',
  'product.alert.addOtherBody':
    'Add each additional expiry date and quantity found for this product in location: {location}',
  // Instruction chips
  'product.chip.countAllBy': 'Count all units expiring by {date}',
  'product.chip.checkLeftoverBy': 'Check leftover units expiring by {date}',
  'product.chip.removeExpired': 'Remove all expired units',

  // Numpad / numeric sheet
  'numpad.enter': 'Enter amount of units in this location',
  'numpad.reEnter': 'Re-Enter amount of units in this location',
  'numpad.recountBody':
    'Please, re-check the counted amount of units from {date} within {location}',
  'numpad.expDate': 'Exp. Date: {date}',

  // Date picker
  'date.question': 'Which expiry date you want to capture?',
  'date.month.0': 'January',
  'date.month.1': 'February',
  'date.month.2': 'March',
  'date.month.3': 'April',
  'date.month.4': 'May',
  'date.month.5': 'June',
  'date.month.6': 'July',
  'date.month.7': 'August',
  'date.month.8': 'September',
  'date.month.9': 'October',
  'date.month.10': 'November',
  'date.month.11': 'December',
  'date.weekday.short.0': 'Sun',
  'date.weekday.short.1': 'Mon',
  'date.weekday.short.2': 'Tue',
  'date.weekday.short.3': 'Wed',
  'date.weekday.short.4': 'Thu',
  'date.weekday.short.5': 'Fri',
  'date.weekday.short.6': 'Sat',
  'date.month.short.0': 'Jan',
  'date.month.short.1': 'Feb',
  'date.month.short.2': 'Mar',
  'date.month.short.3': 'Apr',
  'date.month.short.4': 'May',
  'date.month.short.5': 'Jun',
  'date.month.short.6': 'Jul',
  'date.month.short.7': 'Aug',
  'date.month.short.8': 'Sep',
  'date.month.short.9': 'Oct',
  'date.month.short.10': 'Nov',
  'date.month.short.11': 'Dec',
  'date.dayInitial.0': 'S',
  'date.dayInitial.1': 'M',
  'date.dayInitial.2': 'T',
  'date.dayInitial.3': 'W',
  'date.dayInitial.4': 'T',
  'date.dayInitial.5': 'F',
  'date.dayInitial.6': 'S',

  // Scan
  'scan.locationStep': '1. Scan the location attached to this product to confirm',
  'scan.locationLabel': '1. Location',
  'scan.questionDates':
    '2. Are any other expiry dates attached to this product in this location?',
  'scan.yes': 'Yes, i found other expiry dates',
  'scan.no': 'No, product is out of stock',
  'scan.scanning': 'Scanning…',
  'scan.scanningBarcode': 'Scanning barcode…',
  'scan.scanningLocation': 'Scanning location…',
  'scan.button': 'Scanner',
  'scan.removeAria': 'Remove location',

  // Language screen
  'language.title': 'Language',
  'language.english': 'English',
  'language.portuguese': 'Portuguese',

  // Product names
  'products.cocaCola': 'Coca-Cola Fresh Drink Bottle  350ml',
  'products.cocaCola120': 'Coca-Cola Fresh Drink Bottle - 350ml',
  'products.pesto': 'Pesto sauce Italian Original Flavour 200 ml',
  'products.sprite': 'Sprite lemon soda - Fresh Drink lemon flavour 350 ml',
}

const pt: Dict = {
  // Common
  'common.done': 'Concluído',
  'common.submit': 'Enviar',
  'common.apply': 'Aplicar',
  'common.cancel': 'Cancelar',
  'common.edit': 'Editar',
  'common.back': 'Voltar',

  // Bottom nav
  'nav.orders': 'Pedidos',
  'nav.audits': 'Auditorias',
  'nav.receiving': 'Recebimento',
  'nav.more': 'Mais',

  // Audits screen
  'audits.title': 'Auditorias',
  'audits.profileAria': 'Perfil',
  'audits.helpAria': 'Ajuda',
  'audits.tab.count': 'Contagem',
  'audits.tab.expiry': 'Validade',
  'audits.seg.cycle': 'Contagem Cíclica',
  'audits.seg.full': 'Contagem Total da Loja',
  'audits.inProgress': 'Em andamento',
  'audits.toDo': 'A fazer',
  'audits.tag.expiryChecks': 'Verificações de Validade',
  'audits.tag.outOfDate': 'Verificações de Vencidos',
  'audits.productsCount': '{n} produtos',

  // Task detail
  'task.prefix': 'Tarefa',
  'task.toCheck': 'A verificar',
  'task.checked': 'Verificado',
  'task.finishTask': 'Concluir Tarefa',
  'task.notFound': 'Não encontrado',
  'task.newLocationToast': 'Uma nova localização foi adicionada à lista',
  'task.goTo': 'Ir para {location}',
  'task.productSingular': '{n} produto',
  'task.productPlural': '{n} produtos',

  // Product detail / inputs
  'product.inputQuantity': 'Inserir Quantidade',
  'product.inputQuantityLower': 'Inserir quantidade',
  'product.addBatches': 'Adicionar lotes',
  'product.confirmMismatch': 'Confirmar',
  'product.batch': 'Lote',
  'product.quantity': 'Quantidade',
  'product.expiryDate': 'Data de validade',
  'product.location': 'Localização',
  'product.expiration': 'Validade: {date}',
  'product.expDate': 'Val.: {date}',
  'product.items': '{n} itens',
  'product.itemsRemoved': '{n} itens removidos',
  'product.alert.countAllOn':
    'Conte todas as unidades que vencem em {date}',
  'product.alert.removeCount':
    'Remova e conte todas as unidades vencidas deste produto',
  'product.alert.timeToCheckMissing':
    'Hora de verificar unidades faltantes!\nConte todas as unidades com data de validade: {date} nesta localização {location}',
  'product.alert.mismatchTitle': 'A data de validade ainda não confere',
  'product.alert.mismatchBody':
    'Por favor, verifique e adicione todos os lotes de validade para a localização: {location}',
  'product.alert.addOtherTitle': 'Adicione outras datas de validade encontradas',
  'product.alert.addOtherBody':
    'Adicione cada data de validade adicional e quantidade encontrada para este produto na localização: {location}',
  'product.chip.countAllBy':
    'Conte todas as unidades vencendo até {date}',
  'product.chip.checkLeftoverBy':
    'Verifique unidades restantes vencendo até {date}',
  'product.chip.removeExpired': 'Remova todas as unidades vencidas',

  // Numpad / numeric sheet
  'numpad.enter': 'Insira a quantidade de unidades nesta localização',
  'numpad.reEnter': 'Reinsira a quantidade de unidades nesta localização',
  'numpad.recountBody':
    'Por favor, reverifique a quantidade contada de unidades de {date} em {location}',
  'numpad.expDate': 'Val.: {date}',

  // Date picker
  'date.question': 'Qual data de validade você quer capturar?',
  'date.month.0': 'Janeiro',
  'date.month.1': 'Fevereiro',
  'date.month.2': 'Março',
  'date.month.3': 'Abril',
  'date.month.4': 'Maio',
  'date.month.5': 'Junho',
  'date.month.6': 'Julho',
  'date.month.7': 'Agosto',
  'date.month.8': 'Setembro',
  'date.month.9': 'Outubro',
  'date.month.10': 'Novembro',
  'date.month.11': 'Dezembro',
  'date.weekday.short.0': 'Dom',
  'date.weekday.short.1': 'Seg',
  'date.weekday.short.2': 'Ter',
  'date.weekday.short.3': 'Qua',
  'date.weekday.short.4': 'Qui',
  'date.weekday.short.5': 'Sex',
  'date.weekday.short.6': 'Sáb',
  'date.month.short.0': 'Jan',
  'date.month.short.1': 'Fev',
  'date.month.short.2': 'Mar',
  'date.month.short.3': 'Abr',
  'date.month.short.4': 'Mai',
  'date.month.short.5': 'Jun',
  'date.month.short.6': 'Jul',
  'date.month.short.7': 'Ago',
  'date.month.short.8': 'Set',
  'date.month.short.9': 'Out',
  'date.month.short.10': 'Nov',
  'date.month.short.11': 'Dez',
  'date.dayInitial.0': 'D',
  'date.dayInitial.1': 'S',
  'date.dayInitial.2': 'T',
  'date.dayInitial.3': 'Q',
  'date.dayInitial.4': 'Q',
  'date.dayInitial.5': 'S',
  'date.dayInitial.6': 'S',

  // Scan
  'scan.locationStep':
    '1. Escaneie a localização anexada a este produto para confirmar',
  'scan.locationLabel': '1. Localização',
  'scan.questionDates':
    '2. Existem outras datas de validade anexadas a este produto nesta localização?',
  'scan.yes': 'Sim, encontrei outras datas de validade',
  'scan.no': 'Não, o produto está em falta',
  'scan.scanning': 'Escaneando…',
  'scan.scanningBarcode': 'Escaneando código de barras…',
  'scan.scanningLocation': 'Escaneando localização…',
  'scan.button': 'Scanner',
  'scan.removeAria': 'Remover localização',

  // Language screen
  'language.title': 'Idioma',
  'language.english': 'Inglês',
  'language.portuguese': 'Português',

  // Product names
  'products.cocaCola': 'Coca-Cola Garrafa de Refrigerante 350ml',
  'products.cocaCola120': 'Coca-Cola Garrafa de Refrigerante - 350ml',
  'products.pesto': 'Molho Pesto Sabor Italiano Original 200 ml',
  'products.sprite': 'Sprite refrigerante de limão - Sabor limão 350 ml',
}

export const dict: Record<Lang, Dict> = { en, pt }

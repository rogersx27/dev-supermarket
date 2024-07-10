const sales = []
const salesByHour = {}

function addSale() {
  const category = document.getElementById("productCategory").value
  const productName = document.getElementById("productName").value
  const quantity = parseInt(document.getElementById("quantity").value)
  const unitPrice = parseFloat(document.getElementById("unitPrice").value)
  const currentHour = new Date()
  const hours = currentHour.getHours()
  const minutes = currentHour.getMinutes()
  const time = `${hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}`

  console.log(currentHour)

  if (!productName || !quantity || !unitPrice) {
    alert("Por favor, complete todos los campos")
    return
  }

  let discount = 0
  if (category === "cuidado_personal") {
    if (quantity > 15) {
      discount = 15
    } else if (quantity > 10) {
      discount = 10
    } else if (quantity > 4) {
      discount = 5
    }
  }

  const discountAmount = (unitPrice * quantity * discount) / 100
  const totalPrice = unitPrice * quantity - discountAmount

  const sale = {
    productName,
    category,
    quantity,
    unitPrice,
    discount,
    totalPrice,
    hour: currentHour,
  }

  sales.push(sale)

  if (!salesByHour[time]) {
    salesByHour[time] = 0
  }
  salesByHour[time] += 1

  document.getElementById("salesSection").classList.remove("hidden")
  document.getElementById("summarySection").classList.remove("hidden")
  document.getElementById("salesPerHourSection").classList.remove("hidden")
  document.getElementById("receiptSection").classList.remove("hidden")
  document.getElementById("finishDaySection").classList.remove("hidden")

  updateSalesTable()
  updateCategorySummary()
  updateSalesPerHour()
  updateDailyReceipt()
}

function updateSalesTable() {
  const tbody = document
    .getElementById("salesTable")
    .getElementsByTagName("tbody")[0]
  tbody.innerHTML = ""

  sales.forEach((sale) => {
    const row = tbody.insertRow()
    row.insertCell(0).innerText = sale.productName
    row.insertCell(1).innerText = sale.category
    row.insertCell(2).innerText = sale.quantity
    row.insertCell(3).innerText = sale.unitPrice.toFixed(2)
    row.insertCell(4).innerText = sale.discount + "%"
    row.insertCell(5).innerText = sale.totalPrice.toFixed(2)
  })
}

function updateCategorySummary() {
  const summary = document.getElementById("categorySummary")
  summary.innerHTML = ""

  const categoryTotals = sales.reduce((acc, sale) => {
    if (!acc[sale.category]) {
      acc[sale.category] = 0
    }
    acc[sale.category] += sale.totalPrice
    return acc
  }, {})

  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )

  sortedCategories.forEach(([category, total]) => {
    const li = document.createElement("li")
    li.innerText = `${category}: $${total.toFixed(2)}`
    summary.appendChild(li)
  })
}

function updateSalesPerHour() {
  const salesPerHour = document.getElementById("salesPerHour")
  salesPerHour.innerHTML = ""

  const sortedSalesByHour = Object.entries(salesByHour).sort(
    (a, b) => b[1] - a[1]
  )

  sortedSalesByHour.forEach(([hour, count]) => {
    const li = document.createElement("li")
    // aplica negrito solo a la hora
    li.innerHTML = `Fecha <strong>${hour}</strong>: ${count} ventas`
    salesPerHour.appendChild(li)
  })
}

function updateDailyReceipt() {
  const receipt = document.getElementById("dailyReceipt")
  receipt.innerHTML = ""

  let receiptText = ""
  sales.forEach((sale) => {
    receiptText += `Producto: ${sale.productName}\n`
    receiptText += `Categoría: ${sale.category}\n`
    receiptText += `Cantidad: ${sale.quantity}\n`
    receiptText += `Precio Unitario: $${sale.unitPrice.toFixed(2)}\n`
    receiptText += `Descuento: ${sale.discount}%\n`
    receiptText += `Total: $${sale.totalPrice.toFixed(2)}\n`
    receiptText += "-------------------------\n"
  })

  receipt.innerText = receiptText
}

function endDay() {
  if (sales.length > 0) {
    generateCSV()
    clearData()
  } else {
    alert("No hay ventas para finalizar el día.")
  }
}

function generateCSV() {
  let csvContent = "data:text/csv;charset=utf-8,"
  const date = new Date().toISOString().split("T")[0]
  let fileName = `ventas_diarias_${date}.csv`
  csvContent += "Producto,Categoría,Cantidad,Precio Unitario,Descuento,Total\n"

  sales.forEach((sale) => {
    const row = [
      sale.productName,
      sale.category,
      sale.quantity,
      sale.unitPrice.toFixed(2),
      sale.discount + "%",
      sale.totalPrice.toFixed(2),
    ].join(",")
    csvContent += row + "\n"
  })

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function clearData() {
  sales.length = 0
  for (const key in salesByHour) {
    delete salesByHour[key]
  }

  document.getElementById("salesSection").classList.add("hidden")
  document.getElementById("summarySection").classList.add("hidden")
  document.getElementById("salesPerHourSection").classList.add("hidden")
  document.getElementById("receiptSection").classList.add("hidden")
  document.getElementById("finishDaySection").classList.add("hidden")

  updateSalesTable()
  updateCategorySummary()
  updateSalesPerHour()
  updateDailyReceipt()
}

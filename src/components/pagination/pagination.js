import './pagination.scss'

document.querySelectorAll('.pagination').forEach(element => {
  const defaults = {
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 170
  }
  const linksBlock = element.querySelector('.pagination__links')
  const previousPageLink = document.createElement('a')
        previousPageLink.classList.add('pagination__link', 'pagination__link--previous')
        previousPageLink.setAttribute('href', '#')
  const nextPageLink = document.createElement('a')
        nextPageLink.classList.add('pagination__link','pagination__link--next')
        nextPageLink.setAttribute('href', '#')
  let description = element.querySelector('.pagination__description')
  let {currentPage, itemsPerPage, totalItems} = defaults
  let totalPages = Math.ceil(totalItems/itemsPerPage)

  previousPageLink.addEventListener('click', function() {render(currentPage - 1)})
  nextPageLink.addEventListener('click', function() {render(currentPage + 1)})

  if (totalPages < 2) {
    element.style.display = 'none'
    return
  }

  function render(newCurrentPage) {
    let contentOfLinks = []

    currentPage = newCurrentPage
    linksBlock.innerHTML = '';
    linksBlock.prepend(previousPageLink)
    linksBlock.append(nextPageLink)

    previousPageLink.style.display = null
    nextPageLink.style.display = null

    if (newCurrentPage === 1) previousPageLink.style.display = 'none'
    if (newCurrentPage === totalPages) nextPageLink.style.display = 'none'

    if (totalPages < 8) {
      for (let i = 1; i < 8; i++) {
          contentOfLinks.push(i)
      }
    } else {
      if (newCurrentPage < 5) {
        let limit = newCurrentPage < 3 ? 3 : newCurrentPage + 1
        for (let i = 1; i <= limit; i++) {
          contentOfLinks.push(i)
        }
        contentOfLinks.push('...')
        contentOfLinks.push(totalPages)
      } else if (newCurrentPage > totalPages - 4) {
        let limit = newCurrentPage > totalPages - 2 ? totalPages - 2 : newCurrentPage - 1
        contentOfLinks.push(1)
        contentOfLinks.push('...')
        for (let i = limit; i <= totalPages; i++) {
          contentOfLinks.push(i)
        }
      } else {
        contentOfLinks.push(1)
        contentOfLinks.push('...')
        for (let i = newCurrentPage - 1; i < newCurrentPage + 2; i++) {
          contentOfLinks.push(i)
        }
        contentOfLinks.push('...')
        contentOfLinks.push(totalPages)
      }
    }

    contentOfLinks.forEach(content => {
      let link = buildLinkHtml(content, content === newCurrentPage ? true : false)
      if (typeof(content) === 'number') link.addEventListener('click', function() {render(content)})
      linksBlock.insertBefore(link, nextPageLink)
    })
    renderDescription()
  }

  function buildLinkHtml(content, isActive) {
    let link = document.createElement('a')
    let type = typeof(content) === 'number' ? 'number' : 'ellipsis'
    link.classList.add('pagination__link', `pagination__link--${type}`)
    if (isActive) link.classList.add('pagination__link--active')
    link.setAttribute('href', '#')
    link.innerHTML = content
    return link
  }

  function renderDescription() {
    let rangeFrom = (currentPage - 1) * itemsPerPage + 1
    let rangeTo = currentPage === totalPages ? totalItems : currentPage * itemsPerPage
    description.innerHTML = `${rangeFrom} – ${rangeTo} из ${totalItems > 100 ? '100+' : totalItems} вариантов аренды`
  }

  render(currentPage)
  renderDescription()
})

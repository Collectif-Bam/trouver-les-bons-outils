document.addEventListener('DOMContentLoaded', () => {

    // =========================================== OBJECTS

    const tools = {
        cards: document.querySelectorAll('.tool'),
        refresh: () => {
            tools.cards.forEach((tool, index) => {

                const tags = tool.dataset.tags.split(',')

                if (!tags) return
                if (delivery.activeFilters.length === 0) {
                    tool.classList.remove('hide')
                    return
                }

                if (tags.some(tag => delivery.activeFilters.includes(tag))) {
                    tool.classList.remove('hide')
                } else {
                    tool.classList.add('hide')
                }

            })
        }
    }

    const search = {
        btn: document.querySelector('.search__btn'),
        container: document.querySelector('.search'),
        filters: document.querySelectorAll('.search__filter'),
        list: document.querySelector('.search__list'),
        activeFilters: [],
        isOpen: false,
        toggle: () => {
            search.container.classList.toggle('search--open')
            
            search.isOpen = !search.isOpen
        }
    }

    const selection = {
        counter: document.querySelector('.count'),
        count: 0,
        list: document.querySelector('.selection__list'),
        refresh: () => {
            selection.count = delivery.activeFilters.length
            selection.counter.textContent = selection.count
        }
    }

    const delivery = {
        activeFilters: [],
        addToSelection: target => {
            const tag = target.textContent
            delivery.activeFilters.push(tag)

            const li = document.createElement('li')
            li.innerHTML = `<button class="selection__filter">${tag}</button>`
            selection.list.appendChild(li)

            target.parentNode.removeChild(target)
        },
        
        removeFromSelection: target => {
            if (!target) return
            const tag = target.textContent
            delivery.activeFilters = delivery.activeFilters.filter(item => item !== tag)

            const li = document.createElement('li')
            li.innerHTML = `<button class="search__filter">${tag}</button>`
            search.list.appendChild(li)


            target.parentNode.removeChild(target)
        }
    }

    // =========================================== INTERACTIONS

    search.btn.addEventListener('click', () => {
        search.toggle()
    })

    search.list.addEventListener('click', event => {
        const target = event.target.closest('.search__filter')
        delivery.addToSelection(target)
        selection.refresh()
        tools.refresh()
    })

    selection.list.addEventListener('click', event => {
        const target = event.target.closest('.selection__filter')
        delivery.removeFromSelection(target)
        selection.refresh()
        tools.refresh()
    })

})
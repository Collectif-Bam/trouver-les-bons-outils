document.addEventListener('DOMContentLoaded', () => {
/* ====================
=======================
DÉBUT
=======================
==================== */

    // =========================================== OBJECTS

    const app = {
        url: document.querySelector('body').dataset.url
    }

    const tools = {
        cards: document.querySelectorAll('.tool'),
        refresh: () => {
            tools.cards.forEach(tool => {

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
        dropDown: document.querySelector('.dropDown'),
        container: document.querySelector('.search'),
        wrapper: document.querySelector('.search__wrapper'),
        filters: document.querySelectorAll('.search__filter'),
        list: document.querySelector('.search__list'),
        indicators: document.querySelectorAll('.filters__indicator'),
        initIndicators: () => {
            document.querySelectorAll('input').forEach(input => {
                input.checked = false
            })
            document.querySelector('input').checked = true
        },
        isOpen: false,
        toggle: () => {
            search.container.classList.toggle('search--open')
            search.dropDown.classList.toggle('dropDown--close')
            setTimeout(() => {
                search.wrapper.classList.toggle('unvisible')
            }, 100);
            
            search.isOpen = !search.isOpen
        },
        filter: (label, isCheck) => {
            if (label === 'mobile') {
                if (isCheck) {
                    tools.cards.forEach(tool => {
                        if (!tool.dataset.indicators.includes('mobile')) {
                            tool.classList.add('mobileLock')
                        }
                    })
                } else {
                    document.querySelectorAll('.mobileLock').forEach(element => {
                        element.classList.remove('mobileLock')
                    });
                }
            } else {
                if (label === 'selection') {
                    tools.cards.forEach(tool => {
                        if (!tool.dataset.indicators.includes('osinum')) {
                            tool.classList.add('selectionLock')
                        }
                    })
                } else {
                    document.querySelectorAll('.selectionLock').forEach(element => {
                        element.classList.remove('selectionLock')
                    });
                }
            }
        }
    }

    const selection = {
        counter: document.querySelector('.count'),
        count: 0,
        filters: document.querySelector('.selection__filters'),
        tools: document.querySelector('.selection__tools'),
        refresh: () => {
            selection.count = delivery.activeFilters.length
            selection.counter.textContent = selection.count
        },
        form: {
            container: document.querySelector('.form'),
            openBtn: document.querySelector('.formBtn'),
            submitBtn: document.querySelector('.form__submit'),
            toggle: () => {
                selection.form.container.classList.toggle('form--open')
            },
            submit: data => {
                const url = app.url + '/assets/mails/sendSelection.php'
                
                fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'text/html'
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                })
                .then(function(res){ console.log(res) })
                .catch(function(res){ console.log(res) })
            }
        }
    }

    const delivery = {
        activeFilters: [],
        selectedTools: [],   
        addToFilters: target => {
            const tag = target.textContent
            delivery.activeFilters.push(tag)

            const li = document.createElement('li')
            li.innerHTML = `<button class="selection__filter --tagBtn">${tag}<span><img class="picto" src="${app.url}/assets/pictos/close.svg" /></span></button>`
            selection.filters.appendChild(li)

            target.classList.add('hide')
        },
        
        removeFromFilters: target => {
            if (!target) return
            const tag = target.textContent
            delivery.activeFilters = delivery.activeFilters.filter(item => item !== tag)

            search.filters.forEach(filter => {
                if (filter.textContent === tag)
                    filter.classList.remove('hide')
            })


            target.parentNode.removeChild(target)
        },
        selectTool: tool => {
            tool.classList.toggle('tool--selected')
            
            const title = tool.querySelector('h2').textContent

            if (!delivery.selectedTools.includes(title)) {
                console.log('select');
                delivery.selectedTools.push(title)
            
                const li = document.createElement('li')
                li.innerHTML = `<button class="selection__tool --tagBtn">${title}<span><img class="picto" src="${app.url}/assets/pictos/close.svg" /></span></button>`

                selection.tools.appendChild(li)
            } else {
                delivery.deselectTool(tool)
            }
        },
        deselectTool: tool => {
            if (tool.classList.contains('selection__tool')) {
                const name = tool.textContent
                tools.cards.forEach(tool => {
                    if (tool.querySelector('h2').textContent === name) {
                        tool.classList.toggle('tool--selected')
                    }
                })
                delivery.selectedTools = delivery.selectedTools.filter(title => title !== name)
                tool.parentNode.removeChild(tool)
            } else {
                const name = tool.querySelector('h2').textContent

                document.querySelectorAll('.selection__tool').forEach(tool => {
                    if (tool.textContent === name) {
                        tool.parentNode.removeChild(tool)
                    }
                })
                delivery.selectedTools = delivery.selectedTools.filter(title => title !== name)
            }
        }
    }

    // =========================================== INITIALISATION
    search.initIndicators()

    // =========================================== INTERACTIONS

    search.btn.addEventListener('click', () => {
        search.toggle()
    })

    search.list.addEventListener('click', event => {
        const target = event.target.closest('.search__filter')
        delivery.addToFilters(target)
        selection.refresh()
        tools.refresh()
    })

    search.indicators.forEach(indicator => {
        indicator.addEventListener('change', e => {
            const target = e.target
            const label = target.parentNode.dataset.value
            const isCheck = target.checked

            search.filter(label, isCheck)
        })
    });

    selection.filters.addEventListener('click', event => {
        const target = event.target.closest('.selection__filter')
        delivery.removeFromFilters(target)
        selection.refresh()
        tools.refresh()
    })

    selection.tools.addEventListener('click', event => {
        const target = event.target.classList.contains('selection__tool') ? event.target : event.target.closest('.selection__tool')
        delivery.deselectTool(target)
    })

    tools.cards.forEach(tool => {
        tool.addEventListener('mouseenter', () => {
            
        })
        tool.addEventListener('mouseleave', () => {
            
        })

        tool.querySelector('.tool__header').addEventListener('click', event => {
            delivery.selectTool(tool)
        })
    })

    selection.form.openBtn.addEventListener('click', () => {
        selection.form.toggle()
    })

    selection.form.submitBtn.addEventListener('click', () => {
        data = {
            email: 'adrien.payet@outlook.com',
            message: 'un certain message'
        }
        
        selection.form.submit(data)
    })

/* ====================
=======================
FIN
=======================
==================== */
})
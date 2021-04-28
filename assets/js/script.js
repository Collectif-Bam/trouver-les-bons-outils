document.addEventListener('DOMContentLoaded', () => {
/* ====================
=======================
DÉBUT
=======================
==================== */

    // =========================================== OBJECTS

    const app = {
        url: document.querySelector('body').dataset.url,
        email: document.querySelector('body').dataset.email,
        name: document.querySelector('body').dataset.name
    }

    const tools = {
        cards: document.querySelectorAll('.tool'),
        comments: document.querySelectorAll('.comment'),
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
        },
        toggleComment: comment => {

            const content = comment.querySelector('.comment__content')

            const icon = comment.querySelector('.dropDown')

            icon.classList.toggle('dropDown--close')

            if (content.classList.contains('hide')) {
                content.classList.remove('hide')
                setTimeout(() => {
                    const contentHeight = parseInt(window.getComputedStyle(content).getPropertyValue('height'))
                    comment.style.height = `calc(3rem + ${contentHeight}px)`
                }, 10);
            } else {
                comment.style.height = ''
                setTimeout(() => {
                    content.classList.add('hide')
                }, 500);
            }
        },
        getTags: tool => {
            let tags = []
            tool.querySelectorAll('.summary__tag').forEach(tag => {
                tags.push(tag.textContent)
            })

            return tags
        },
        preselect: tool => {
            tool.classList.add('tool--hover')
            
            const tags = tools.getTags(tool)

            tools.cards.forEach(tool => {
                tool.querySelectorAll('.summary__tag').forEach(tag => {
                    if (tags.includes(tag.textContent)) {
                        tag.classList.add('--tagBtn--preselect')
                    }
                })
            })
        },
        depreselect: tool => {
            tool.classList.remove('tool--hover')
            document.querySelectorAll('.--tagBtn--preselect').forEach(tag => {
                tag.classList.remove('--tagBtn--preselect')
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
                            selection.indicators.mobile.classList.remove('hide')
                        }
                    })
                } else {
                    document.querySelectorAll('.mobileLock').forEach(element => {
                        element.classList.remove('mobileLock')
                        selection.indicators.mobile.classList.add('hide')
                    });
                }
            } else {
                if (label === 'selection') {
                    tools.cards.forEach(tool => {
                        if (!tool.dataset.indicators.includes('osinum')) {
                            tool.classList.add('selectionLock')
                            selection.indicators.osinum.classList.remove('hide')
                        }
                    })
                } else {
                    document.querySelectorAll('.selectionLock').forEach(element => {
                        element.classList.remove('selectionLock')
                        selection.indicators.osinum.classList.add('hide')
                    });
                }
            }
        }
    }

    const selection = {
        practicesCounter: document.querySelector('.practicesCount'),
        practicesCount: 0,
        toolsCounter: document.querySelector('.toolsCount'),
        toolsCount: 0,
        filters: document.querySelector('.selection__filters'),
        tools: document.querySelector('.selection__tools'),
        indicators: {
            osinum: document.querySelector('.selection__indicators__osinum'),
            mobile: document.querySelector('.selection__indicators__mobile')
        },
        refresh: () => {
            selection.practicesCount = delivery.activeFilters.length
            selection.practicesCounter.textContent = selection.practicesCount

            selection.toolsCount = delivery.selectedTools.length
            selection.toolsCounter.textContent = selection.toolsCount
        },
        form: {
            container: document.querySelector('.form'),
            openBtn: document.querySelector('.formBtn'),
            submitBtn: document.querySelector('.form__submit'),
            CTA: document.querySelector('.formCTA'),
            open: () => {
                selection.form.container.classList.add('form--open')
                selection.form.CTA.classList.add('--fadeToUp')
                selection.form.submitBtn.classList.add('--fadeFromDown')
            },
            close: () => {
                selection.form.container.classList.remove('form--open')
                selection.form.CTA.classList.remove('--fadeToUp')
                selection.form.submitBtn.classList.remove('--fadeFromDown')
            },
            success: () => {
                const originalText = selection.form.CTA.textContent

                selection.form.CTA.textContent = 'Envoyé !'
                setTimeout(() => {
                    selection.form.CTA.textContent = originalText
                }, 1000);
            },
            error: () => {
                const originalText = selection.form.CTA.textContent

                selection.form.CTA.textContent = 'Erreur, veuillez réessayer plus tard'
            },
            validateMail: userMail => {
                const validateMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
                return validateMail.test(userMail)
            },
            invalid: () => {
                const originalText = selection.form.submitBtn.value

                selection.form.submitBtn.value = 'Mail invalide !'
                setTimeout(() => {
                    selection.form.submitBtn.value = originalText
                }, 500);
            },
            submit: userMail => {
                const url = app.url + '/assets/mails/sendSelection.php'

                const contact = document.querySelector('#contact').checked ? `${userMail}, ${app.name} <${app.email}>` : userMail

                const toolsList = document.createElement('ul')
                let toolsNames = []
                document.querySelectorAll('.selection__tool').forEach(tool => {
                    const name = tool.textContent
                    toolsNames.push(name)
                })

                toolsNames.forEach(toolName => {
                    const li = document.createElement('li')
                    li.textContent = toolName
                    toolsList.appendChild(li)
                })

                const data = {
                    from: `${app.name} <${app.email}>`,
                    to: contact,
                    message: `Bonjour,<br />
                    <br />
                    Vos outils libres sélectionnés via Osinum : <br />
                    ${toolsList.outerHTML}`
                }
                
                fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                })
                .then(res => { 
                    console.log(res)
                    selection.form.close()
                    selection.form.success()
                })
                .catch(res => { 
                    console.log(res)
                    selection.form.error()
                })
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
            li.innerHTML = `<button class="selection__filter --tagBtn">${tag}<span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L13 13" stroke="#fff"/><path d="M13 1L1 13" stroke="#fff"/></svg></span></button>`
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
                delivery.selectedTools.push(title)
            
                const li = document.createElement('li')
                li.innerHTML = `<button class="selection__tool --tagBtn">${title}<span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L13 13" stroke="#fff"/><path d="M13 1L1 13" stroke="#fff"/></svg></span></button>`

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
        },
        selectedTags: [],
        selectTags: tool => {
            tool.querySelectorAll('.summary__tag').forEach(tag => {
                delivery.selectedTags.push(tag.textContent)
            })

            tools.cards.forEach(tool => {
                tool.querySelectorAll('.summary__tag').forEach(tag => {
                    if (delivery.selectedTags.includes(tag.textContent)) {
                        tag.classList.add('summary__tag--selected')
                    }
                })
            })
        },
        deselectTags: tool => {
            tool.querySelectorAll('.summary__tag').forEach(tag => {
                const index = delivery.selectedTags.indexOf(tag.textContent)
                delivery.selectedTags.splice(index, 1)
            })

            tools.cards.forEach(tool => {
                tool.querySelectorAll('.summary__tag').forEach(tag => {
                    if (!delivery.selectedTags.includes(tag.textContent)) {
                        tag.classList.remove('summary__tag--selected')
                    }
                })
            })
            
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
        let tool
        document.querySelectorAll('.tool').forEach(item => {
            if (item.querySelector('.tool__header h2').textContent === target.textContent) {
                tool = item
            }
        })

        delivery.deselectTool(target)
        delivery.deselectTags(tool)
        selection.refresh()
    })

    tools.cards.forEach(tool => {
        tool.addEventListener('mouseenter', () => {
            if (tool.classList.contains('tool--selected'))
                return false
            
            tools.preselect(tool)

        })
        tool.addEventListener('mouseleave', () => {
            if (tool.classList.contains('tool--selected'))
                return false
            
                tools.depreselect(tool)
        })

        tool.querySelector('.tool__header').addEventListener('click', event => {
            delivery.selectTool(tool)
            tools.depreselect(tool)
            if (tool.classList.contains('tool--selected')) {
                delivery.selectTags(tool)
            } else {
                delivery.deselectTags(tool)
            }
            selection.refresh()
        })
    })

    selection.form.submitBtn.addEventListener('click', () => {

        if (!selection.form.container.classList.contains('form--open')) {
            selection.form.open()
        } else {
            const userMail = document.querySelector('.form input[type="email"]').value
        
            if (selection.form.validateMail(userMail)) {
                selection.form.submit(userMail)
            } else {
                selection.form.invalid()
            }
         }
    })

    tools.comments.forEach(comment => {
        comment.addEventListener('click', () => {
            tools.toggleComment(comment)
        })
    })

/* ====================
=======================
FIN
=======================
==================== */
})
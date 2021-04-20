export class App {

    /**
     * Filter function
     * @param {[HTMLElement]} filters - The list of all filter buttons that may be active or not.
     * @param {[HTMLElement]} items - The list of all items to be filtered.
     * @param {HTMLElement} filter - The filter button the user clicked and that needs to be activated
     */
    static filters(filters, items) {
        
        filters.forEach(element => {
            element.addEventListener('click', event => {

                const tag = event.target.textContent.toLowerCase()

                console.log(tag);

                filters.forEach(filter => {
                    filter.classList.remove('active')
                })

                event.target.classList.add('active')

                if (tag === 'all') {
                    items.forEach(item => {
                        item.classList.remove('hide')
                    })
                } else {
                    items.forEach(item => {
                        item.classList.remove('hide')
                        if (item.dataset.tag !== tag) {
                            item.classList.add('hide')
                        }
                    })
                }

            })
        })

    }

    /**
     * Returns a promise containing stringifyied data fetched from the URL passed.
     * @param {string} url 
     * @returns {promise}
     */
    static async load(url) {        
        const response = await fetch(url)

        if (!response.ok) {
            throw 'Requête invalide.'
        }

        return await response.text()
    }

    /**
     * Injects a HTML string in a container using a certain method.
     * @see App.load()
     * @param {string} data - HTML string. Received as a promise after App.load()
     * @param {HTMLElement} container - Where the HTML string will be injected.
     * @param {string} method - [Optional] Options : 'cut' (default) or 'fade'
     */
    static inject(data, container, method) {
        method = typeof method === 'undefined' ? 'cut' : method
    
        if (method === 'cut') {
            container.innerHTML = data
        }            
    }


    /**
     * Streches the target on scroll.
     * @param {HTMLElement} target - The target that should be stretched on scroll.
     * @param {number} minSize - The minimum size under which the target shouldn't shrink more.
     * @param {number} resizeCoef - [Optional] The resize coefficient. Default = 1.007.
     * @param {boolean} conditions - [Optional] Conditions to be fulfilled to execute the function.
     */
    static stretchOnScroll(target, minSize, resizeCoef, conditions) {
        resizeCoef = typeof resizeCoef === 'undefined' ? 1.007 : resizeCoef
        conditions = typeof conditions === 'undefined' ? 1 === 1 : conditions
        
        let prevScrollPos = 0
        const originalSize = parseInt(window.getComputedStyle(target).getPropertyValue('font-size'))
        target.style.fontSize = originalSize + 'px'

        window.addEventListener('scroll', event => {
            if ((window.scrollY * - resizeCoef + originalSize) >= minSize && conditions) {
                target.style.fontSize = window.scrollY * - resizeCoef + originalSize + 'px'
            } else {
                target.style.fontSize = minSize + 'px'
            }
        })

    }
}
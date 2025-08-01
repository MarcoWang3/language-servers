import { JSDOM } from 'jsdom'

export function injectJSDOM() {
    /**
     * JSDOM is used to help hoist MynahUI to running in a node environment vs in the browser (which is what it's made for)
     */
    const dom = new JSDOM(undefined, {
        pretendToBeVisual: true,
        includeNodeLocations: true,
    })
    global.window = dom.window as unknown as Window & typeof globalThis
    global.document = dom.window.document
    global.self = dom.window as unknown as Window & typeof globalThis
    global.Element = dom.window.Element
    global.HTMLElement = dom.window.HTMLElement
    global.CustomEvent = dom.window.CustomEvent
    global.MutationObserver = dom.window.MutationObserver
    global.Image = dom.window.Image
    global.FileReader = dom.window.FileReader

    // jsdom doesn't have support for innerText: https://github.com/jsdom/jsdom/issues/1245 which mynah ui uses
    Object.defineProperty(global.Element.prototype, 'innerText', {
        get() {
            return this.textContent
        },
    })

    // jsdom doesn't have support for structuredClone. See https://github.com/jsdom/jsdom/issues/3363
    global.structuredClone = val => JSON.parse(JSON.stringify(val))
}

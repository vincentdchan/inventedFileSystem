import store from '../store/index'
const path = require('path')
export const deleteFile = function() {
    let selectedIndex = store.state.selectedIndex
    if (selectedIndex > -1) {
        let item = store.state.fileItems[selectedIndex]
        let removePath = path.posix.join(store.state.path, item.name)
        store.dispatch('removeFile', {
            showPath: store.state.path,
            filePath: removePath
        })
    }
}
export const openFile = function() {
    let selectedIndex = store.state.selectedIndex
    const item = store.state.fileItems[selectedIndex]
    const showPath = path.posix.join(store.state.path, item.name)
    if (item.type === 0x1) { // is a dir
        store.dispatch('changeDir', showPath)
    } else if (item.type === 0x0) { // is a file
        // something
        store.commit('setSelectedIndex', selectedIndex)
        store.dispatch('openFile', showPath)
    }
}
export const copyFile = function() {
    let selectedIndex = store.state.selectedIndex
    if (selectedIndex > -1) {
        const item = store.state.fileItems[selectedIndex]
        const _path = path.posix.join(store.state.path, item.name)
        store.commit('setCopyPath', _path)
        store.commit('setIsCut', false)
    }
}
export const cutFile = function() {
    let selectedIndex = store.state.selectedIndex
    if (selectedIndex > -1) {
        const item = store.state.fileItems[selectedIndex]
        const _path = path.posix.join(store.state.path, item.name)
        store.commit('setCopyPath', _path)
        store.commit('setIsCut', true)
    }
}
export const newFile = function() {
    store.commit('setKind', 'newFile')
    store.commit('setFileRenameShow', true)
}
export const newDir = function() {
    store.commit('setKind', 'newDir')
    store.commit('setFileRenameShow', true)
}
export const pasteFile = function() {
    let filename = path.posix.basename(store.state.copyPath)
    store.dispatch('pasteFile', {
        srcPath: store.state.copyPath,
        distPath: path.posix.join(store.state.path, filename),
        showPath: store.state.path,
        isCut: store.state.isCut
    })
}
export const openFileProperty = function() {
    let selectedIndex = store.state.selectedIndex
    if (selectedIndex > -1) {
        let item = store.state.fileItems[selectedIndex]
        let _path = path.posix.join(store.state.path, item.name)
        store.dispatch('showFileProperty', _path)
    }
}

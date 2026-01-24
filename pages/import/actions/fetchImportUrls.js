async function (component) {
    // @TODO: Check if the URL is actually a ZIP file and not another type

    const zipProxyUrl = 'zithub.pother.ca'

    const imports = await simplyApp.actions.getImport(component)

    const importUrls = imports
        .filter(importItem => importItem.id === 'importUrls')
        .map(importItem => JSON.parse(importItem.contents))
        .flat(2)

    const fetches = importUrls.map(importDetails => {
        const url = new URL(importDetails.url)

        // GitHub does not send CORS headers, so a custom build proxy is used
        if (url.hostname.endsWith('github.com')) {
            url.pathname = `${url.href}`
            url.hostname = zipProxyUrl
        }

        return fetch(url)
    })

    const responses = await Promise.all(fetches)

    const arrayBufferResponses = responses.map(async response => {
        let blob = await response.blob()

        return await blob.arrayBuffer()
    })

    const arrayBuffers = await Promise.all(arrayBufferResponses)

    const zipArchives = arrayBuffers.map(async arrayBuffer => {
        const files = {}

        const zip = await JSZip.loadAsync(arrayBuffer)
        const zipFiles = Object.values(zip.files)

        for (const file of zipFiles) {
            if (file.dir === false) {
                files[file.name] = await file.async('blob')
            }
        }

        return files
    })

    const archiveFiles = await Promise.all(zipArchives)

    // @CHECKME: Instead of a naked object, should FileList and File be used?

    const fileCollections = archiveFiles.map(async fileCollection => {
        for (const [ fileName, blob ] of Object.entries(fileCollection)) {
            const bytes = await blob.arrayBuffer()

            let contents, type

            try {
                type = 'text/plain;charset=utf-8'
                contents = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
            } catch (e) {
                type = 'application/octet-stream'
                contents = blob
            }

            fileCollection[fileName] = { contents, type }
        }

        return fileCollection
    })

    return await Promise.all(fileCollections)
}

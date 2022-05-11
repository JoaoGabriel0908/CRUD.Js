'use strict'

const imagePreview = (idfile, idImage) => {

    const file = document.getElementById(idfile).files[0]
    const preview = document.getElementById(idImage)
    const fileReader = new FileReader()

    // Se o arquivo for selecionado...
    if(file){
        // Ele irá ler o file...
        fileReader.readAsDataURL(file)
        // E mandar para o id da imagem
        fileReader.onloadend = () => preview.src = fileReader.result
    }

    console.log(file)
}

export {imagePreview}
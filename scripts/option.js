export function option(content, contenido){
    content.innerHTML = `<option value="">selecione</option>`

    contenido.forEach((element) => {
        content.innerHTML += `
        <option value="${element.codigo}">${element.nome}</option>`;
    });
}
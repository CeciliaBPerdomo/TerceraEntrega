const fs = require('fs')
class container{
    constructor(filename){
        this.filename = filename; 
    }

    // Mostrar productos
    async leer(){
        try{
            let contenido = await fs.promises.readFile(this.filename, 'utf-8')
            return JSON.parse(contenido)
        } catch(error){
            throw new Error(error)
        }
    }

    // guardar productos
    async escribir(producto){
        try{
            const fetch = await this.leer()
            let data = fetch
            let ultId = 0
            const cantidadItems = data.length
            console.log('Data: ', data)

            if(cantidadItems !== 0){
                ultId = data[cantidadItems - 1].id
            }

            producto['id'] = ultId + 1
            data.push(producto)

            data = JSON.stringify(data)
            await fs.promises.writeFile(this.filename, data)           
        } catch(error){
            console.log(error);
        }
     }

     // borrar por id un producto
     async borrarPorId(id) {
        try{
            const fetch = await this.leer() 
            const data = fetch.find(e => e.id == id)
            const index = fetch.indexOf(data)

            fetch.splice(index, 1)
            await fs.promises.writeFile(this.filename, JSON.stringify(fetch))

            let contenidoNuevo = await this.leer()
            return contenidoNuevo
         }catch(error){
             throw new Error(error)
         }
     }

     // modificar Por Id un product
     async modificarPorId(producto, id){
        try{
            const contenidoParseado = await this.leer() 
            const elementos = contenidoParseado.find(e => e.id == id)
            const index = contenidoParseado.indexOf(elementos) 
            
            if(producto.nombre){
                contenidoParseado[index].nombre = producto.nombre
            }

            if(producto.descripcion){
                contenidoParseado[index].descripcion = producto.descripcion
            }

            if(producto.codigo){
                contenidoParseado[index].codigo = producto.codigo
            }

            if(producto.foto){
                contenidoParseado[index].foto = producto.foto
            }

            if(producto.stock){
                contenidoParseado[index].stock = producto.stock
            }

            if(producto.precio){
                contenidoParseado[index].precio = producto.stock
            }
            await fs.promises.writeFile(this.filename, JSON.stringify(contenidoParseado))  
        }catch(error){
            throw new Error(error)
        }
     }
}

module.exports = container;
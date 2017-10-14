import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Title from '../../common/Title/Title';
import Group from '../../common/Group/Group';
import Product from '../../common/Product/Product';

import './Frequent.css';
const canastas = [
  {src: './img/items/manzana.jpg', nombre: 'Manzana', categoria: 'Frutas', precio: '2500', unidad: 'Libra'},
  {src: './img/items/arveja.jpg', nombre: 'Arveja', categoria: 'Verduras', precio: '2500', unidad: 'Libra'},
  {src: './img/items/huevo.jpg', nombre: 'Huevo', categoria: 'Granja', precio: '300', unidad: 'Unidad'},

];

class Frequent extends Component {
  render() {
    return (
        <div className="Frequent">
          <div className="frequentProducts">
            <Title title="Productos Frecuentes"/>
            <Group>
              {this.props.products.map((product,index) => {
                return <Product src={product.src} name={product.nombre} category={product.categoria} price={product.precio} unit={product.unidad} key={product.src+index}/>
              })}
            </Group>
            <Link to={{pathname: "/products"}} ><Title title="Ver todos..."/></Link>
          </div>
          <div className="frequentBaskets">
            <Title title="Canastas Frecuentes"/>
            <Group>
              {canastas.map((product,index) => {
                return <Product src={product.src} name={product.nombre} category={product.categoria} price={product.precio} unit={product.unidad} key={product.src+index}/>
              })}
            </Group>
          </div>

        </div>
    )
  }

}


export default Frequent;

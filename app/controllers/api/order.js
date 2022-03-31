//Model for MySQL
const db = require('../../database/models');

//Path
const basePath = require('../../app');

const orderController = {
    allOrders: (req, res) => {
        db.Pedido.findAll({include: ['producto', 'estatus']})
        .then(async (orders) => {
            if(orders){
                //Arrange order data into desired format
                let pedidos = [];
                let totalIngresos = 0;

                for(order of orders){
                    pedidos.push({
                        name: order.producto.name,
                        status: order.estatus.name,
                        price: order.producto.price,
                    });

                    totalIngresos += order.producto.price;
                }

                let ultimos5 = pedidos.slice(-5);

                res.status(200).json({ 
                    numberOfOrders: orders.length,
                    totalIncome: totalIngresos,
                    last5Orders: ultimos5,
                });
            } else {
                res.status(200).json({ data: "No hay ningún pedido registrado actualmente" });
            }
        })
        .catch((e) => {
            console.log(e);
        });
	},
};

module.exports = orderController;
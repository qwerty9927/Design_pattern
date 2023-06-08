
class DeliveryService {
  constructor(name, price, capacity){
    this.name = name
    this.price = price
    this.capacity = capacity
  }

  getNameVehical(){
    console.log(`Vehical name: ${this.name}`)
  }
}

class RoadDelivery extends DeliveryService {
  constructor(name, price, capacity){
   super(name, price, capacity)
  }
}

class SeaDelivery extends DeliveryService {
  constructor(name, price, capacity){
    super(name, price, capacity)
   }
}

new SeaDelivery("Boad").getNameVehical()
new RoadDelivery("Truck").getNameVehical()
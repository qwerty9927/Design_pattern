
// simple factory pattern
class DeliveryService {
  constructor(name, price, capacity) {
    this.name = name
    this.price = price
    this.capacity = capacity
  }

  static getBestTruck(capacity){
    switch(capacity){
      case 10:
        return new DeliveryService("Truck 10", "100.000 VND", 10).getInfoTruck()
      case 20:
        return new DeliveryService("Truck 20", "200.000 VND", 20).getInfoTruck()
    }
  }

  getInfoTruck(){
    console.log(`Truck name: ${this.name}`)
    console.log(`Price: ${this.price}`)
    console.log(`Capacity: ${this.capacity}`)
  }
}

DeliveryService.getBestTruck(20)


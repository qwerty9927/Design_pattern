
class RoundRobin {
  constructor() {
    if(RoundRobin.instance) {
      return RoundRobin.instance
    }
    RoundRobin.instance = this
    this.servers = []
    this.index = 0
  }
  
  addServer(server) {
    this.servers.push(server)
  }

  getNextServer(){
    if(!this.servers.length) {
      throw new Error("Server is null")
    }
    this.index = (this.index + 1) % this.servers.length
    return this.servers[this.index]
  }
}

const loadBalancer = new RoundRobin()
const loadBalancer1 = new RoundRobin()

console.log(loadBalancer === loadBalancer1)

loadBalancer.addServer("01")
loadBalancer.addServer("02")
loadBalancer.addServer("03")

console.log(loadBalancer.getNextServer()) // 02
console.log(loadBalancer.getNextServer()) // 03
console.log(loadBalancer.getNextServer()) // 01
console.log(loadBalancer.getNextServer()) // 02
console.log(loadBalancer.getNextServer()) // 03


# **Creational pattern**
## **Factory Method pattern**

> <div align="center"><img src="assets/imgs/factory-method-en.png" ></div>

- **Root explain**: Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

- **Translate and explain**: Factory Method pattern là một thiết kế cung cấp interface để tạo ra các đối tượng bên trong lớp cha và cho phép lớp con thay đổi các đối tượng được dùng bên trong đó.

> VD: Một công ty vận chuyển logictics có 2 ngành vận chuyển là vận chuyển đường bộ ( Road ) và vận chuyển đường thủy ( Sea ). Các dịch vụ được đăng ký thông qua một phương thức và công ty sẽ trả về dịch vụ mà bạn muốn đăng ký.

> ### **Example delivery service**

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
***
## **Singleton pattern**

> <div align="center"><img src="assets/imgs/singleton.png" ></div>

- **Root explain**: Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.

- **Translate and explain**: Singleton là một thiết kế buộc người dùng chỉ sử dụng một thể hiện ( instance ) của một lớp ( class ) và thể hiện này được sử dụng như một biến toàn cục.

> VD: Bạn có một món đồ A ***( instance đầu tiên và duy nhất được tạo )*** rất nhiều người mượn sử dụng. Mỗi lần sử dụng có thể sẽ làm giá trị của nó thay đổi. Ai muốn mượn ***đều phải thông qua bạn***, điều này có nghĩa là ***người tiếp theo mượn*** sẽ luôn biết được giá trị đó.

> ### **Example RoundRobin algorithm**
    
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
***
# **Structural pattern**
## **1. Facade pattern**

> <div align="center"><img src="assets/imgs/facade.png" ></div>

- **Root explain**: Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.

- **Translate and explain**: Facade là mô hình cung cấp sự đơn giản hóa của một chuỗi hành động được ẩn phía sau.

> VD: Bạn đăng ký môn học. Thì bạn chỉ cần nhấn chọn và lưu môn học, nhưng hệ thống phải thực hiện rất nhiều thao tác như kiểm tra trùng thời gian học, kiểm tra còn chỗ không, xử lý nhiều người chọn cùng lúc thì như thế nào và trả ra thông báo kết quả cho bạn. ***Và bạn cần chỉ là kết quả đăng ký môn thôi***.

> ### **Example calculate price of order**

    class Discount{
        calc(value){
            return value * 0.9
        }
    }

    class Shipping{
        calc(){
            return 5
        }
    }

    class Fees{
        calc(value){
            return value * 1.1
        }
    }

    class ShopeeFacadePattern{
        constructor(){
            this.discount = new Discount()
            this.shipping = new Shipping()
            this.fees = new Fees()
        }

        calc(price){
            price = this.discount.calc(price)
            price = this.fees.calc(price)
            price = this.shipping.calc()
            return price
        }
    }

    function bill(price){
        const shopee = new ShopeeFacadePattern()
        return shopee.calc(price)
    }

    bill(130000)
***
## **2. Proxy pattern**

> <div align="center"><img src="assets/imgs/proxy.png"></div>

- **Root explain**: Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.

- **Translate and explain**: Proxy là mô hình cung cấp một đối tượng đại diện cho đối tượng gốc để thực hiện công việc gì đó trước khi tiếp xúc với đối tượng gốc.

> VD: Bạn là sinh viên của trường A ( phải có thẻ sinh viên thì mới được vào trường ), ***bác bảo vệ là proxy***, ***trường là đối tượng bạn cần tiếp cận***. Bác bảo vệ là người sẽ tiếp xúc với bạn đầu tiên xem xét bạn có phải là sinh viên của trường hay không trước khi bạn được vào trường.

> ### **Example offer salary**

    class Leader{
        receiveRequest(offer){
            console.log("result:::${offer})
        }
    }

    class Secretary{
        constructor(){
            this.leader = new Leader()
        }
        receiveRequest(offer){
            this.leader.receiveRequest(offer)
        }
    }

    class Developer{
        constructor(offer){
            this.offer = offer
        }

        applyFor(target){
            target.receiveRequest(this.offer)
        }
    }

    const dev = new Developer("upto 5k USD")
    dev.applyFor(new Secretary)
***
# **Behavioral pattern**
## **1. Strategy pattern**

> <div align="center"><img src="assets/imgs/strategy.png" ></div>

- **Root explain:** Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

- **Translate and explain:** Đặt các xử lý có cùng mục đích vào một class hoặc một function ( không nhất thiết các xử lý phải cùng một file ). Thực hiện truy cập các xử lý thông qua class hoặc function đó.

> VD: Bạn có 3 căn cấp bốn và 1 căn biệt thự. Căn thứ nhất ở Thủ Đức, thứ hai ở Quận 4, thứ ba ở Quận 5, căn biệt thự ở Quận nhất ( đây là căn bạn luôn về vào mỗi tối ). Đứng ở vị trí 1 trong 3 căn cấp bốn thì bạn đều phải đi về căn biệt thự. Và căn biệt thự sẽ là trung tâm để bạn ***chọn lựa*** đi đến 1 trong 3 căn cấp bốn.

> ### **Example calculate price of order**

    // Giảm giá khi người dùng đặt trước một sản phẩm của VINFAST 
    function preOrderPrice(originalPrice) {
        return originalPrice * 0.2;
    }

    // Tiếp tục thêm tính năng khuyễn mãi thông thường, ví dụ Nếu giá gốc < 200 thì giảm 10%, còn > thì giảm tối đa 30
    function promotionPrice(originalPrice) {
        return originalPrice <= 200 ?  originalPrice * 0.1 : originalPrice - 30;
    }

    // Đến ngày blackFriday promotion
    function blackFridayPrice(originalPrice) {
        return originalPrice <= 200 ?  originalPrice * 0.2 : originalPrice - 50;
    }

    // Giá mặc định
    function defaultPrice(originalPrice) {
        return originalPrice;
    }
<!-- -->
    const getPriceStrategies = {
        preOrder: preOrderPrice,
        promotion: promotionPrice,
        blackFriday: blackFridayPrice,
        default: defaultPrice,
    }

    // Kết hợp trạng thái với chiến lược chiết khấu, hàm giá có thể được tối ưu hóa như sau:
    function getPrice(originalPrice, typePromotion) {
        return getPriceStrategies[typePromotion](originalPrice);
    }

    console.log('-->>>',  getPrice(200,  'blackFriday'))
***
## **2. Observer pattern**

> <div align="center"><img src="assets/imgs/observer.png" ></div>

- **Root explain**: Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.

- **Translate and explain**: Là mô hình mà ở đó các đối tượng đăng ký nhận thông báo từ một đối tượng trung tâm. Khi đối tượng trung tâm phát ra sự kiện thì các đối tượng đã đăng ký sẽ nhận được thông báo.

> VD: Sinh viên đăng ký một lớp học với giảng viên A. Khi giảng viên này giảng bài thì các sinh viên đều chú ý theo dõi, nhưng trong mỗi người lại có một cách hiểu bài riêng của mình.

> ### **Example notify for all remain player**
- Trù tượng hóa của *các đối tượng người chơi*
<!-- -->
    class  Observer  {
        constructor(name)  {
            this.namePick  =  name;
        }

        update(location)  {
            this.goToHelp(location);
        }

        goToHelp(location)  {
            console.log(`${this.namePick} ping::${location}`);
        }
    }

- Trù tượng hóa của *đối tượng trung tâm*
<!-- -->
    class  Subject  {
        constructor()  {
            this.observerList  =  []
        }

        addObserver(observer)  {
            this.observerList.push(observer);
        }

        notify(location)  {
            this.observerList.forEach(observer  =>  observer.update(location))
        }
    }

- Phát đi sự kiện từ đối tượng trung tâm
<!-- -->
    const  subject  =  new  Subject()

    // your pick
    const  riki  =  new  Observer('Riki')
    const  sniper  =  new  Observer('Sniper')

    // add riki and sniper to team
    subject.addObserver(riki)
    subject.addObserver(sniper)

    // push location to Team
    subject.notify({long:  123,  lat:  106})
***


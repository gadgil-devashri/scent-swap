const { v4: uuidv4 } = require('uuid');
// how to use uuidv4(); 

const trades = [
{
    id:"1",
    title:"Sandalwood",
    category:"Woody scent",
    company:"Soulcare",
    type:"1 wick",
    original_net_weight:"10",
    existing_net_weight:"4.5",
    original_price:"6.50",
    status:"available",
    image:"/images/sandalwood.jpeg",
    details:"In aromatherapy, sandalwood has many benefits. Its sweet, soft scent relaxes human body, and promotes positive thinking, clarity and aids concentration. Many people believe it can also help boost memory. Often sandalwood is associated as a 'masculine' smell but it's actually used in loads in 'feminine' marketed fragrances out there."
},
{
    id:"2",
    title:"Pine",
    category:"Woody scent",
    company:"White Barn",
    type:"3 wick",
    original_net_weight:"14.5",
    existing_net_weight:"6",
    original_price:"26.50",
    status:"available",
    image:"/images/pine.jpeg",
    details:" Pine tree aroma has sharp, sweet, and refreshing notes. Lit a candle and the enjoy smell of pine trees: pine needles, bark and cones - just like a walk through a pine forest.Like a classic winter scene coming to life, the mix of pine needles and winter air pair wonderfully with fruit, floral and citrus scents."
},
{
    id:"3",
    title:"Juniper",
    category:"Woody scent",
    company:"Le Labo",
    type:"2 wick",
    original_net_weight:"12",
    existing_net_weight:"7",
    original_price:"13.99",
    status:"available",
    image:"/images/juniper.png",
    details:"It has distinctive aroma that is woody, sweet, fresh and crisp. Get a juniper scented candle for the holiday season, your house will smell amazing for weeks.It blends well with woody smells like cedarwood, sandalwood and rosewood and other conifers like cypress and fir needle."
},
{
    id:"4",
    title:"Rose",
    category:"Floral scent",
    company:"Bath & Body Works",
    type:"3 wick",
    original_net_weight:"14.5",
    existing_net_weight:"9",
    original_price:"26.50",
    status:"available",
    image:"/images/rose.jpeg",
    details:"A candle that relieves stress, fights anxiety, and relaxes your body and mind. People say that the scent of the rose is both the scent of great love, and it is also very enveloping like Mother's arms.It's a very sensual and romantic scent that is emotionally uplifting"
},
{
    id:"5",
    title:"Lavender",
    category:"Floral scent",
    company:"White Barn",
    type:"3 wick",
    original_net_weight:"15",
    existing_net_weight:"10",
    original_price:"26.50",
    status:"available",
    image:"/images/lavender.jpeg",
    details:"Lavender has a delicate, sweet smell that is floral, herbal, and evergreen woodsy at the same time. It has soft, powdery, or smokey notes as well. Lavender is one of the most popular scents for relaxing and falling asleep. It can help release tension, soothe racing thoughts and help you unwind."
},
{
    id:"6",
    title:"Jasmine",
    category:"Floral scent",
    company:"White Barn",
    type:"1 wick",
    original_net_weight:"12",
    existing_net_weight:"5.5",
    original_price:"6.50",
    status:"available",
    image:"/images/jasmine.jpeg",
    details:"The floral scent of jasmine is rich, sweet, fruity, and sensual. Unlike other flowers, Jasmine also has a slight animalistic edge that smells tenacious and musky. The combination of feminine sweetness and masculine wildness make the smell of jasmine universally attractive."
}

];

exports.find = function(){
    return trades;
};

exports.findById = function(id){
    return trades.find(trade => trade.id === id);
};

exports.save = function(trade){
    trade.id = uuidv4();
    trade.status = 'available';
    trades.push(trade);
}

exports.delete = function(id){
    let trade_id = trades.findIndex(trade => trade.id === id);
    if(trade_id != -1){
        trades.splice(trade_id,1)
        return true
    }
    else{
        return false
    }
}

exports.update = function(id, newTrade){
    let trade = trades.find(trade => trade.id === id);
    if(trade){
        trade.title = newTrade.title;
        trade.category = newTrade.category;
        trade.company = newTrade.company;
        trade.type = newTrade.type;
        trade.original_net_weight = newTrade.original_net_weight;
        trade.existing_net_weight = newTrade.existing_net_weight;
        trade.original_price = newTrade.original_price;
        trade.status = "available";
        trade.image = newTrade.image;
        trade.details = newTrade.details;
        return true;
    }
    else{
        return false;
    }
}
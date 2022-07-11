

    
var ctx = document.getElementById("canv").getContext("2d");

var dic = {
    grass:{name:"grass",emote:"<:00:976014562996391936>",points:0},
    stone:{name:"stone",emote:"<:01:976014584836128798>",points:0},
    air:{name:"air",emote:"<:02:976014603182014514>",points:0},
    cheast:{name:"cheast",emote:"<:03:986301020386758656>",points:500},
    dirt:{name:"dirt",emote:"<:04:976025190741966920>",points:0},
    wood:{name:"wood",emote:"<:05:976028310289145916>",points:0},
    leaves:{name:"leaves",emote:"<:06:976028821142794240>",points:0},
    coal:{name:"coal",emote:"<:07:976747069731667988>",points:5},
    diamond:{name:"diamond",emote:"<:08:976747112123486239>",points:100},
    gold:{name:"gold",emote:"<:09:976747136509173791>",points:20},
    netherrack:{name:"netherrack",emote:"<:10:976747165869297665>",points:0},
    coald:{name:"coald",emote:"<:11:976747199310491658>",points:5},
    irond:{name:"irond",emote:"<:12:976747224799272970>",points:25},
    emeraldd:{name:"emeraldd",emote:"<:13:976747252309717093>",points:200},
    iron:{name:"iron",emote:"<:14:976747278100475916>",points:25},
    redstone:{name:"redstone",emote:"<:15:976747301110444042>",points:7},
    deepslate:{name:"deepslate",emote:"<:16:976747345008025620>",points:0},
    goldn:{name:"goldn",emote:"<:17:976747365719486494>",points:20},
    lapis:{name:"lapis",emote:"<:18:976747395742326794>",points:5},
    emerald:{name:"emerald",emote:"<:19:976747421013012490>",points:200},
    quartz:{name:"quartz",emote:"<:20:976747440675905550>",points:10},
    copperd:{name:"copperd",emote:"<:21:976747460452036618>",points:10},
    lapisd:{name:"lapisd",emote:"<:22:976747483327778816>",points:5},
    goldd:{name:"goldd",emote:"<:23:976747504311877643>",points:20},
    copper:{name:"copper",emote:"<:24:976747529930670110>",points:10},
    bedrock:{name:"bedrock",emote:"<:25:976747546405920769>",points:0},
    debris:{name:"debris",emote:"<:26:976747566303686666>",points:0},
    obsidian:{name:"obsidian",emote:"<:27:976747582762151976>",points:0},
    diamondd:{name:"diamondd",emote:"<:28:976747598763417620>",points:100},
    redstoned:{name:"redstoned",emote:"<:29:976747620594749470>",points:7},
    black:{name:"black",emote:"<:30:976752550713892885>",points:0},
    fox:{name:"fox",emote:"<:31:976765562275364934>",points:0},	
	water:{name:"water",emote:"<:32:980055020315758622>",points:0},
    barrier:{name:"barrier",emote:"<:33:985931497489973248>",point:0},
    steve:{name:"steve",emote:"<:p00:986984735471443969>",point:0} //steve (nie chce mi się pisać funkcji wczytywania skina)
};
var unbreakable = ["barrier","bedrock"]
var oredata = {  
    oreorder:[
    [[0,0],[0,1]],
    [[0,0],[0,1],[1,0],[1,1]],
    [[0,0],[0,1],[1,0],[1,1],[0,2]],
	[[0,0]],
	[[1,0],[0,1],[2,1],[3,1],[0,2],[1,2],[2,2],[1,3]],
	[[1,0],[1,1],[1,2],[0,1]]
    ],
    placeingData:[
    {
      name:dic.iron.name,
      y:7,
      dy:150,
      ord:[0,1,2],
      count:40
    },
    {
        name:dic.iron.name,
        y:7,
        dy:150,
        ord:[0,1,2],
        count:40
    },
	{
      name:dic.copper.name,
      y:32,
      dy:100,
      ord:[1,2],
      count:60
    },	
	{
      name:dic.lapis.name,
      y:7,
      dy:92,
      ord:[4,0,1],
      count:30
    },	
	{
      name:dic.redstone.name,
      y:7,
      dy:80,
      ord:[2,4,1,3],
      count:45
    },	
	{
      name:dic.coal.name,
      y:64,
      dy:150,
      ord:[2,0,1],
      count:45
    },		
	{
      name:dic.diamond.name,
      y:7,
      dy:100,
      ord:[3,0,1],
      count:30
    },	
	{
      name:dic.gold.name,
      y:50,
      dy:150,
      ord:[2,0,1],
      count:25
    },	
	{
      name:dic.emerald.name,
      y:7,
      dy:150,
      ord:[3],
      count:60
    }
    ]
}
var structures = {	
	minesheft:{
	instructions:[],
//np ["fill",x,y,dx,dy,block] [set,x,y,block]
	gen:{
	y:7,
	dy:64
	},
	maxcount:2
	}
}

class gamecore{
    constructor(playerc=1,playerd=[{skin:"luk"}]){
        this.skin = []
        this.x = []
        this.y = []
        playerd.forEach((p,i)=>{
            this.skin.push(p.skin)
            this.x[i]=Math.round(ww/2);
            this.y[i]=128;
        })
        this.pcount = playerc
        this.generated = false;
        this.world = []
        this.generateOW();
        this.set = true;
        this.punkty = 0;
        }
// generatory światów
        generateOW(Wwidth = ww){
		this.Wwidth = Wwidth
        //overworld generation
        //prepair
        this.world = [];
        for(var seti = 0;seti<192;seti++){
            this.world[seti] = [];
        }
        //bedrock 0-7
        var bedrockHelp = 3;
        for(var xi = 0;xi<Wwidth;xi++){
            var rannd = random(5);
            //+2 +1 0 -1 -2
            if(rannd==1&&bedrockHelp+2<8) bedrockHelp = bedrockHelp + 2;
            if(rannd==2&&bedrockHelp+1<8) bedrockHelp++;
            if(rannd==4&&bedrockHelp-1>0) bedrockHelp--;
            if(rannd==5&&bedrockHelp-2>0) bedrockHelp = bedrockHelp - 2;
            for(var yi = 0;yi<bedrockHelp;yi++){
                this.world[yi][xi] = dic.bedrock.name;
            }
            //deepslate gapp fill
            for(var yi = 0;yi<7;yi++){
                if(this.world[yi][xi]!=dic.bedrock.name) this.world[yi][xi] = dic.deepslate.name;
            }
        }
        
        //deepslate
        for(var yi = 7;yi<64;yi++){
            this.world[yi] = getlineof(dic.deepslate.name);
        }
        //irregolar deepslate
        var deepslateHelp = 3;
        for(var xi = 0;xi<Wwidth;xi++){
            var rannd = random(7);
            //+1 0 0 0 0 0 -1
            if(rannd==1&&deepslateHelp+1<9)deepslateHelp++;
            if(rannd==7&&deepslateHelp-1>0)deepslateHelp--;
            for(var yi = 0;yi<deepslateHelp;yi++){
                this.world[yi+64][xi] = dic.deepslate.name;
            }
            //stone gaps fill
            for(var yi = 0;yi<8;yi++){
                if(this.world[yi+64][xi]!=dic.deepslate.name)this.world[yi+64][xi] = dic.stone.name
            }
        }
        //stone
        
        //stone line
        for(var yi = 72;yi<128;yi++){
            this.world[yi] = getlineof(dic.stone.name);
        }
        var stoneHelp = random(21);
        for(var xi = 0;xi<Wwidth;xi++){
            //+1 -1 0 0 0 0 0
            var rannd = random(7);
            if(rannd==1&&stoneHelp+1<21)stoneHelp++
            if(rannd==2&&stoneHelp-1>0)stoneHelp--
            var tempstone = stoneHelp+128
            for(var yi = 0;yi<stoneHelp;yi++){
                this.world[yi+128][xi] = dic.stone.name;
            }
            this.world[tempstone][xi] = dic.dirt.name;
            this.world[tempstone+1][xi] = dic.dirt.name;
            if(tempstone<128+6)this.world[tempstone+2][xi] = dic.dirt.name;else this.world[tempstone+2][xi] = dic.grass.name;
            //drzewo
            this.skin.forEach((s,i)=>{
                if(xi==this.x[i])this.y[i] = tempstone+3
            })
            
			
            if(random(7)==7&&tempstone>128+7){
                if(xi==32)this.y = tempstone+6
                this.world[tempstone+3][xi] = dic.wood.name;
                this.world[tempstone+4][xi] = dic.leaves.name
                this.world[tempstone+5][xi] = dic.leaves.name
                if(xi<this.Wwidth)this.world[tempstone+4][xi+1] = dic.leaves.name
                if(xi>-1)this.world[tempstone+4][xi-1] = dic.leaves.name;
            }	
			
			{
			
			for(var wi = 0;wi<9;wi++){
			if(!this.world[128+wi][xi])this.world[128+wi][xi] = dic.water.name
			}
			}

        }
        //air
        for(var xi = 0;xi<Wwidth;xi++){
            for(var yi = 128;yi<181;yi++){
                if(this.world[yi][xi]==undefined) this.world[yi][xi] = dic.air.name;
            }	
// 		
        }
        //fill up air
        
        for(var yi = 181;yi<192;yi++){
            this.world[yi] = getlineof(dic.air.name);
        }	
// 		generowanie rud	
		oredata.placeingData.forEach(ore => {	
// 		 name:dic.diamond.name,
//       y:0,
//       dy:100,
//       ord:[0,1,2],
//       count:10		
		
		for(var c = 0;c<ore.count*(Math.round(this.Wwidth/64));c++){
		var orey = random(ore.dy-ore.y)+ore.y		
		
		var orex = random(Wwidth-1)
		var order = oredata.oreorder[ore.ord[random(ore.ord.length)-1]]	
		order.forEach(possp => {
		this.setblockOre(orex+possp[0], orey+possp[1], ore.name)
		
		})
		}
		})
        //generator funkgje pomocnicze
        function getlineof(block){
            var out = [];
            for(var il = 0;il<Wwidth;il++){
                out[il] = block
            }
            return out;
        }  
        // funkcje kontroli
        }
        getblock(x,y){
            try{
                var out = this.world[y][x].toString();
                if(out==undefined) return dic.barrier.name.toString();
                else return out
            }catch{
                return dic.barrier.name.toString();
            }
            
        }	
		setblockOre(x,y,block){
			if(this.world[y][x]==dic.stone.name)this.world[y][x] = dic[block].name;	
			if(this.world[y][x]==dic.deepslate.name)this.world[y][x] = dic[block].name+"d";
        }
        setblock(x,y,block){
            this.world[y][x] = dic[block].name;
        }
        fill(x,y,dx,dy,block){ 
            var xdd = dx-x-1;
            var ydd = dy-y-1;
            for(var ix = 0;ix<xdd;ix++){
                for(var iy = 0;iy<ydd;iy++){
                    this.world[iy+y][ix+x] = dic[block].name;
                }
            }
        }
// pozostałe funkcje
        logWorld(){
        var oput = "";
        for(var yi = 0;yi<192;yi++){
          for(var xi = 0;xi<64;xi++){
        oput += this.world[191-yi][xi].charAt(0);
        }
            oput += "\n"
            
        }
        console.log(oput);
        }
//         podstawowy format dc.
        getdcformatbs(player=0){
        var x = this.x[player]
        var y = this.y[player]
        var out = "";
        var cout = "";
        out+="Punkty : "+this.punkty+"\n"
        for(var yi = 0;yi<9;yi++){
          for(var xi = 0;xi<9;xi++){
            var b = this.getblock(x-4+xi,y+4-yi).toString()
            cout+=b.charAt(0)
            if(yi==4&&xi==4)out+= skins[this.skin[player]].emoji
            else out+=dic[b].emote
          }
          out+="\n"
          cout+="\n"
          
         }
        console.log(cout)
        return out
         
        }
        move(x,y,playe=0){
        var tempx = this.x[playe] + x
        var tempy = this.y[playe] + y
        if(unbreakable.includes(this.getblock(tempx,tempy))){

        }else{
            this.x[playe] = tempx
            this.y[playe] = tempy
            this.setAir(this.x[playe],this.y[playe])
            var ty =(this.y)-1
            var down = this.getblock(this.x,ty)
            console.log(down)
            if(down==dic.air.name)this.move(0,-1)
        }
        
        }
        setAir(x,y){
          this.punkty += dic[this.getblock(x,y)].points
          this.setblock(x, y, dic.air.name)
          if(this.getblock(x+1, y)==dic.black.name) this.setAir(x+1, y)  
          if(this.getblock(x-1, y)==dic.black.name) this.setAir(x-1, y)  
          if(this.getblock(x, y+1)==dic.black.name) this.setAir(x, y+1)  
          if(this.getblock(x, y-1)==dic.black.name) this.setAir(x, y-1)
        }
        setmsg(msgID){
            this.msg = msgID;
        }
}

function random(to){
    var rand = (Math.round((Math.random()*10000))%to)+1
    return rand
}
var imgs = {

}
var todo = 0;
var done = 0;
// główne skrypty
//load images
Object.values(dic).forEach(asset=>{
    todo++;
    var url = getemojiUrl(EmojiToId(asset.emote))
    fetch(url).then(r=>{
        var img = new Image;
        img.src = url;
        img.onload = function(){
            imgs[asset.name] = img;
            done++;
            if(done==todo)start();
        }
    })
})
function start(){
ctx.fillStyle = "#ADD8E6"
ctx.fillRect(0,0,144,144)
ctx.drawImage(imgs["grass"],0,0,16,16);
}
// var get emoji url
function getemojiUrl(id){  
    return "https://cdn.discordapp.com/emojis/"+id+".png"
}
// emoji
function EmojiToId(emoji){
return emoji.slice(emoji.length-19, emoji.length-1)
}


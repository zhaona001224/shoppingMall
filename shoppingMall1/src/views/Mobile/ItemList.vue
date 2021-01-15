<template>
	<div>
		<div>
			<div class="nav"> <img src="../../assets/image/icon/icon_home.png" />Home > {{ gameName }} > {{
				gameList.itemName || "Items" }} </div>
			<div class="purchase-note" v-if="gameList.buyNotes">
				<div class="bg">
					<div class="tip">Purchase Notes:</div>
					<div v-html="gameList.buyNotes"></div>
				</div> <img style="    width: 100%;margin-top: -1rem;z-index: -1;position: relative;"
				 src="../../assets/image/mobile/noticeBG.png" /> </div>
			<div class="step-line"
			 style="display: flex; justify-content: space-between">
				<div v-if="
            gameList.productSell == 'both,both' ||
            gameList.productSell == 'coin,coin'
          " :class="selectType == 'coin' ? 'item active point' : 'item point'" @click="$router.push('/coinList/' + $route.params.id)">
				<img src="../../assets/image/icon/icon_coin.png" /> <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"> {{ gameList.coinName || "Silver" }}</span></div>
				<div v-if="
            gameList.productSell == 'both,both' ||
            gameList.productSell == 'item,item'
          " :class="selectType == 'item' ? 'item active point' : 'item point'" @click="$router.push('/itemList/' + $route.params.id)">
				<img src="../../assets/image/icon/icon_item.png" /> <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ gameList.itemName || "Items" }}</span></div>
			</div>
      		<van-popup v-model="showPicker" round position="bottom">
 <van-picker
   confirm-button-text="confirm"  cancel-button-text="cancel"
    show-toolbar value-key="name"
    :columns="categoryList"
    @cancel="showPicker = false"
    @confirm="selectCategory"
  />
  </van-popup>
  	<van-popup v-model="showPicker1" round position="bottom">
   <van-picker
   confirm-button-text="confirm"  cancel-button-text="cancel"
    show-toolbar value-key="name"
    :columns="serveList"
    @cancel="showPicker1 = false"
    @confirm="selectServe"
  />
</van-popup>
			<div class="el-dropdown"v-if="categoryList.length > 0"> <span  @click="showPicker=true"  class="el-dropdown-link">
          {{ selectCategoryData.name
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
				<!-- <el-dropdown-menu class="menu-li" slot="dropdown">
					<el-dropdown-item @click.native="selectCategory(item)" v-for="(item, index) in categoryList"
					 v-if="categoryList.length > 0" :key="item.id" @click="selectCategory(item)"
					 :class="item.id == categoryId ? 'active point' : 'point'">{{ item.name }}</el-dropdown-item>
				</el-dropdown-menu> -->
			</div>
			<div class="el-dropdown"  v-if="serveList.length > 0"> <span @click="showPicker1=true" class="el-dropdown-link">
          {{ selectServeData.name
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
				<!-- <el-dropdown-menu class="menu-li" slot="dropdown">
					<el-dropdown-item @click.native="selectServe(item)" v-for="(item, index) in serveList"
					 v-if="serveList.length > 0" :key="item.id" :class="item.id == serveId ? 'active point' : 'point'">{{ item.name }}</el-dropdown-item>
				</el-dropdown-menu> -->
			</div>
			<div class="step-line item-contain">
				<div class="flex-style">
					<div class="select-title">
						<div>
							<!--You Have Selected:<span style="color: #333">{{ selectCategoryData.name }}
              <span v-if="selectCategoryData.name">-</span> {{ selectServeData.name
							}} - </span>--></div>
						<el-select @change="setCurrency" style="width: 1rem" v-model="currencyInfo.name"
						 placeholder="">
							<el-option v-for="(subItem, subIndex) in currencyData" :key="subItem.showName"
							 :label="subItem.showName" :value="subItem.showName"> </el-option>
						</el-select>
					</div>
					<div class="search">
						<el-input @input="changeInput" v-model="searchKey" placeholder="Search Item Name"></el-input>
						<div class="img-contain"><img src="../../assets/image/icon/icon_search.png" /></div>
					</div>
				</div>
				<div class="li point" v-for="(item, index) in itemList" :key="item.id">
					<div v-if="item.hintImage || item.hintText">
						<el-popover :ref="'Popover'+index" style="min-width: auto; text-align: center" placement="right" trigger="hover">
							<div class="text" style="position: absolute;width: 100%;height: 100%;left: 0;top:0"
							 @click.stop='popClick(index)'></div>
							<div class="pop-item"> <img v-if="item.hintImage" :src="imgUrl + item.hintImage" />
								<div>
									<div class="title hidden-style" style="height: auto"> {{ item.name }} </div>
									<div class="label">{{ item.hintText }}</div>
								</div>
							</div>
							<div slot="reference"><img :src="imgUrl + item.logo" /></div>
						</el-popover>
						<div class="text hidden-style">{{ item.name }}</div>
						<div class="select-num"> <span @click="down(index)" class="down">-</span> <input type="number" :min="item.miniNumber"
							 v-model="item.num" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"
							 class="show" @change="up(index, item.num)" /> <span class="up" @click="up(index, 1)">+</span>							</div>
						<div class="price"> {{ currencyInfo.symbol }}{{ getPrice(item.price * item.num * currencyInfo.rate)
							}} </div>
						<div style="
                position: relative;
                display: flex;
                justify-content: center;
                padding: 13px 0;
              "> <span class="img-contain">
              	<img
                src="../../assets/image/mobile/car1.png"
                class="go"
                @click="
                  addCart(
                    item,
                    item.id,
                    item.price,
                    item.name,
                    item.num,
                    imgUrl + item.hintImage
                  )
                "
              />
              </span> <span class="add" @click="
                  addCart(
                    item,
                    item.id,
                    item.price,
                    item.name,
                     item.num,
                    imgUrl + item.hintImage,
                    1
                  )
                ">Buy Now</span
              >
            
            </div>
          </div>
          <div v-else>
            <img :src="imgUrl + item.logo" />
            <div class="text hidden-style">{{ item.name }}</div>
            <div class="select-num">
              <span @click="down(index)" class="down">-</span> <input type="number"
							 :min="item.miniNumber" v-model="item.num" onkeyup="this.value=this.value.replace(/\D/g,'')"
							 onafterpaste="this.value=this.value.replace(/\D/g,'')" class="show" @change="up(index, item.num)"
							/> <span class="up" @click="up(index, 1)">+</span> </div>
						<div class="price">
						{{ currencyInfo.symbol }}{{ getPrice(item.price * item.num * currencyInfo.rate)
							}} </div>
						<div style="
               position: relative;
                display: flex;
                justify-content: center;
                padding: 13px 0;
              "> <span class="img-contain">
              	<img
                src="../../assets/image/mobile/car1.png"
                class="go"
                @click="
                  addCart(
                    item,
                    item.id,
                    item.price,
                    item.name,
                    item.num,
                    imgUrl + item.hintImage
                  )
                "
              />
              </span> <span class="add" @click="
                  addCart(
                    item,
                    item.id,
                    item.price,
                    item.name,
                     item.num,
                    imgUrl + item.hintImage,
                    1
                  )
                ">Buy Now</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
	<div class="split"></div>
    <div class="footer1" v-if="gameList.description">
      <div class="main-title">Introduction</div>
      <div class="contain">
        <div v-html="gameList.description"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTemplete } from "../../api/common.js";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      serveList: [],
      itemList: [],
      imgUrl: "",
      gameName: localStorage.getItem("gameName"),
      gameList: {},
      selectType: "item",
      searchKey: "",
      itemOriginList: [],
      selectServeData: {},
      currencyData: [],
      selectCurrency: "",
      categoryList: [],
      selectCategoryData: [],
      categoryId: "",
      popClickIndex: 1,
      showPicker:false,
      showPicker1:false
    };
  },
  computed: {
    ...mapState([
      "login",
      "showMoveImg",
      "currencyInfo",
      "currencyInfo",
      "userInfo",
    ]),
  },
  methods: {
    ...mapMutations(["ADD_CART", "CHOOSE_CURRENCY"]),
    down(index) {
      if (this.itemList[index].num == 0) return;
      if (this.itemList[index].num <= this.itemList[index].miniNumber) {
        this.$message({
          type: "error",
          message: "The minimum quantity is " + this.itemList[index].miniNumber,
        });
        return;
      }
      this.itemList[index].num = this.itemList[index].num * 1 - 1;
      this.$forceUpdate();
    },
    getPrice(price) {
      price = price + "";
      var priceStr1 = price.split(".")[0];
      var priceStr = price.split(".")[1];
      if (priceStr) {
        if (priceStr.length === 1) {
          return (price * 1).toFixed(2);
        } else if (priceStr.length === 2) {
          return price;
        } else {
          return (price * 1).toFixed(3);
        }
      } else {
        return (price * 1).toFixed(2);
      }
    },
    popClick(index) {
				this.popClickIndex = this.popClickIndex + 1
				if (this.popClickIndex == 3) {
					this.$refs['Popover' + index][0].doClose();
					this.popClickIndex = 1
				}
			},
    up(index, num) {
      if (num === 1) {
        this.itemList[index].num = this.itemList[index].num * 1 + 1;
      } else {
        if (num < this.itemList[index].miniNumber) {
          this.$message({
            type: "error",
            message:
              "The minimum quantity is " + this.itemList[index].miniNumber,
          });
          this.itemList[index].num = this.itemList[index].miniNumber * 1;
          this.$forceUpdate();
          return;
        }
        this.itemList[index].num = this.itemList[index].num * 1;
      }
      this.$forceUpdate();
    },
    setCurrency(a) {
      var data = this.currencyData.filter((item) => item.showName == a);
      this.CHOOSE_CURRENCY({
        name: data[0].name,
        symbol: data[0].symbol,
        rate: data[0].rate,
        type: 1,
      });
    },
    changeInput() {
      var data = JSON.parse(JSON.stringify(this.itemOriginList));
      this.itemList = data.filter(
        (item) =>
          item.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1
      );
    },
    addCart(item, id, price, name, productNum, img, addType) {
      if (addType == 1) {
        this.ADD_CART({
          detail: item,
          productId: id,
          salePrice: price,
          productName: name,
          productImg: img,
          productNum: productNum,
          type: "item",
          serveId: this.selectServeData.id,
          serveName: this.selectServeData.name,
          gameId: localStorage.gameId,
          gameName: localStorage.gameName,
          categoryName: this.selectCategoryData.name,
          categoryId: this.selectCategoryData.id,
        });
        this.$router.push("/payPage");
      } else {
        if (productNum < 0) {
          this.$message({
            type: "error",
            message: "Please fill in right Quantity",
          });
          return;
        }
        if (productNum == 0) {
          this.$message({
            type: "warning",
            message: "Please Select",
          });
          return;
        }
        this.ADD_CART({
          productId: id,
          salePrice: price,
          productName: name,
          productImg: img,
          productNum: productNum,
          type: "item",
          serveId: this.selectServeData.id,
          serveName: this.selectServeData.name,
          gameId: localStorage.gameId,
          gameName: localStorage.gameName,
          categoryName: this.selectCategoryData.name,
          categoryId: this.selectCategoryData.id,
        });
        this.$message({
          type: "success",
          message: "Add Success",
        });
      }
    },
    getCategory() {
      //获取game
      getTemplete("?type=Category&offset=-1&count=-1").then((response) => {
        if (response.retCode == 0) {
          response.data = response.data || [];
          this.categoryList = response.data.filter((item) => {
            var id = item.game.split(",")[0];
            return id == localStorage.getItem("gameId") && item.online;
          });
          this.imgUrl = window.imgUrl;
          var resultArray = this.categoryList.sort(function compareFunction(
            param1,
            param2
          ) {
            if (param1.order) {
              return;
            }
            return param1.name.trim().localeCompare(param2.name.trim(), "zh");
          });
          console.log(resultArray);
          this.categoryList = resultArray;
          if (this.categoryList.length > 0) {
            this.selectCategoryData = this.categoryList[0];
            this.categoryId = this.categoryList && this.categoryList[0].id;
            this.getServe();
          } else {
            this.getServe();
          }
        } else {
          this.$message({
            type: "warning",
            message: response.message,
          });
        }
      });
    },
    getServe() {
      //获取game
      getTemplete("?type=Server&offset=-1&count=-1").then((response) => {
        if (response.retCode == 0) {
          response.data = response.data || [];
          this.serveList = response.data.filter((item) => {
            if (!item.category) {
              var id = item.game.split(",")[0];
              return (
                id == localStorage.getItem("gameId") &&
                item.online &&
                item.items.length > 2
              );
            }
            if (this.categoryId) {
              var id = item.category.split(",")[0];
              return (
                id == this.categoryId && item.online && item.items.length > 2
              );
            } else {
              var id = item.game.split(",")[0];
              return (
                id == localStorage.getItem("gameId") &&
                item.online &&
                item.class == "item,item" &&
                item.items.length > 2
              );
            }
          });
          var array1 = this.serveList.filter((item) => item.order);
          array1 = array1.sort((a, b) => a.order - b.order);
          var array2 = this.serveList.filter((item) => !item.order);
          array2 = array2.sort(function compareFunction(param1, param2) {
            return param1.name.trim().localeCompare(param2.name.trim(), "zh");
          });
          this.serveList = array1.concat(array2);
          this.imgUrl = window.imgUrl;
          if (this.serveList.length > 0) {
            this.selectServeData = this.serveList[0];
            this.serveId = this.serveList && this.serveList[0].id;
            this.getItem();
          }
        } else {
          this.$message({
            type: "warning",
            message: response.message,
          });
        }
      });
    },
    selectServe(item) {
       this.showPicker1=false
      this.selectServeData = item;
      this.serveId = item.id;
      this.getItem();
      this.$forceUpdate();
    },
    selectCategory(item) {
      this.showPicker=false
      this.selectCategoryData = item;
      this.categoryId = item.id;
      this.getServe();
      this.$forceUpdate();
    },
    getItem() {
      getTemplete("?type=Product&offset=-1&count=-1").then((response) => {
        if (response.retCode == 0) {
          this.itemList = [];
          this.selectServeData.items &&
            JSON.parse(this.selectServeData.items).map((subItem) => {
              response.data.map((item) => {
                if (
                  item.id == subItem.split(",")[0] &&
                  item.type == "item,item"
                ) {
                  this.itemList.push(item);
                  item.num = item.miniNumber;
                }
              });
            });
          var array1 = this.itemList.filter((item) => item.order);
          array1 = array1.sort((a, b) => a.order - b.order);
          var array2 = this.itemList.filter((item) => !item.order);
          array2 = array2.sort(function compareFunction(param1, param2) {
            return param1.name.trim().localeCompare(param2.name.trim(), "zh");
          });
          this.itemList = array1.concat(array2);
          this.itemOriginList = this.itemList;
          this.selectId = this.itemList[0] && this.itemList[0].id;
        } else {
          this.$message({
            type: "warning",
            message: response.message,
          });
        }
      });
    },
    getGame() {
      //获取game
      getTemplete("?type=Game&offset=-1&count=-1").then((response) => {
        if (response.retCode == 0) {
          var data = response.data.filter((item) => {
            return item.id == localStorage.getItem("gameId");
          });
          JSON.parse(localStorage.getItem("currencyData")).map((item) => {
            item = JSON.parse(item);
            item.showName = item.name;
            this.currencyData.push(item);
          });
          //						var name = this.currencyInfo.name
          //						var currencyData = this.currencyData.filter(item => item.name == name);
          //						this.selectCurrency = currencyData[0].id
          this.gameList = data[0];
          if (this.gameList.productSell == "coin,coin") {
            this.$router.replace("/coinList/" + this.$route.params.id);
          }
        } else {
          this.$message({
            type: "warning",
            message: response.message,
          });
        }
      });
    },
  },
  created() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    var isAndroid = ua.match(/(Android)\s+([\d.]+)/);
    this.isMobile = isIphone || isAndroid;
    this.gameName = localStorage.getItem("gameName");
    localStorage.setItem("gameId", this.$route.params.id);
    //获取game
    this.getCategory();
    this.getGame();
  },
};
</script>
<style lang="less" scoped="">
@import "../../assets/css/public.css";
.purchase-note{
	
	box-sizing: border-box;
	margin:0 0.25rem;
	  
	   
	.tip{
		font-size: 0.12rem;
	color: #e1251b;

	font-weight:bold;
	margin-bottom:0.1rem;
	
	}
	.bg{
		 	/deep/ img{
			width: 0.5rem;
		}
		padding: 10px;
		 background-color: #ebebeb;
	}
	
}
.el-dropdown {
  display: block;
  margin: 0.15rem 0.25rem auto;
  padding: 0 0.1rem;
  box-sizing: border-box;
  height: 0.34rem;
  line-height: 0.32rem;
  background-color: #ffffff;
  border: solid 1px #c9c9c9;

  
  font-size: 0.14rem;
  color: #666666;
  text-align: left;
  .el-dropdown-link {
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.step {
  font-size: 0.18rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 0px;
  color: #333333;
  span {
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    background-color: #fdf2f1;
    border: solid 3px rgba(234, 111, 105, 0.4);
    font-family: Arial-BoldMT;
    font-size: 16px;
    letter-spacing: 0px;
    color: #e7534b;
    margin-right: 16px;
  }
}


.step-line {
  padding: 0 0.26rem;
  .select-title {
    color: #999;
    font-size: 0.14rem;
    padding-top: 0.2rem;
	margin-bottom: 0.14rem;
	display: flex;
	justify-content: space-between;
	 /deep/ .el-input__inner {
      height: 0.32rem;
      line-height: 0.32rem;
    }
  }
  .item {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 1.53rem;
    padding: 0.1rem 0;
    background-color: #ffcbc8;
    border-radius: 2px;
    font-size: 0.15rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    margin-top: 10px;
    letter-spacing: 0px;
    color: #ffffff;
    
    img {
      width: 0.21rem;
      height: 0.21rem;
      margin-right: 0.12rem;
    }
    &.active {
      background-color: #e1251b;
    }
  }
}

.serve-contain {
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.2rem;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 150px;
    text-align: center;
    padding: 0.14rem 10px;
    font-size: 0.14rem;
    border: 1px solid #efefef;
    margin-right: 0.2rem;
    position: relative;
    margin-bottom: 0.2rem;
    &:hover {
      border: 1px solid #e1251b;
    }
    &.active {
      border: 1px solid #e1251b;
      &::after {
        right: 0;
        bottom: 0;
        content: "";
        position: absolute;
        width: 0.2rem;
        height: 0.2rem;
        background: url(../../assets/image/icon/icon_check.png);
      }
    }
  }
}

.item-contain {
  margin: 0 auto;
  text-align: left;
  .flex-style {
    position: relative;
    align-items: center;
    .search {
		position: relative;

      /deep/ .el-input__inner {
        padding-left: 10px;
        width: 100%;
        height: 0.35rem;
        background-color: #ffffff;
       	border: solid 1px #e1251b;
       	font-size: 0.14rem;
       	color: #666;
       	border-radius: 0;
       	line-height: 0.35rem;
      }
      .img-contain{
      	width: 0.33rem;
      	height: 0.33rem;
      	position: absolute;
      	top:1px;
      	right: 1px;
      	background-color: #ffcbc8;
      	 img {
      	 	position: absolute;
        top: 0.08rem;
        width: 0.18rem;
        height: 0.18rem;
        
        right: 0.08rem;
      }
      }
     
    }
    .select-title {
      color: #999;
      font-size: 0.14rem;
      margin-top: 0.2rem;
      margin-bottom:  0.14rem;
    }
  }
  .li {
    text-align: center;
    margin-top: 0.2rem;
    box-sizing: border-box;
	display: inline-block;
	box-sizing: border-box;
    width: 50%;
    background-color: #ffffff;
    border: solid 1px #dcdcdc;
    padding: 0.16rem;
    vertical-align: top;
	border-right: 0;
	
   
    &:last-child {
     margin-bottom: 0.2rem;
     border-right: solid 1px #dcdcdc;
    }
    &:nth-child(2n+1) {
      border-right: solid 1px #dcdcdc;
    }
    img {
      width: 0.56rem;
      height:  0.56rem;
      border-radius: 5px;
    }
    .text {
      padding: 0.19rem 0 8px;
      font-size: 0.14rem;
    }
    .select-num {
      margin: 0.18rem auto 12px;
      display: flex;
      align-items: center;
      border-radius: 3px;
      border: solid 1px #dcdcdc;
      color: #808080;
      width: 1.36rem;
      input {
        font-size:0.2rem;
        text-align: center;
        width: 0.9rem;
        height: 0.24rem;
        background-color: #fff;
        line-height: 0.18rem;
        font-size:0.14rem;
        padding: 0;
        color: #666;
        position: relative;
        border: none;
      }
    }
    .down,
    .up {
      display: inline-block;
      width: 0.24rem;
      height: 0.24rem;
      line-height: 0.24rem;
      background-color: #e7e7e7;
      cursor: pointer;
    }
    .price {
      text-align: center;
      font-family: Arial-BoldMT;
      font-size: 0.2rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.18rem;
      letter-spacing: 0px;
      color: #f39800;
    }
    .add {
		  border-radius: 2px;
		  display: inline-block;
		  width: 0.77rem;
		  height: 0.3rem;
		 
			font-size: 0.12rem;
		  text-align: center;
		  line-height:0.3rem;
		  color: #fff;
		  background: #e1251b;
		  font-weight: 600;
		}
		.img-contain{
			width: 0.3rem;
	height: 0.3rem;
	background-color: #4c9adb;
	border-radius: 2px;
	text-align: center;
	margin-right: 5px;
	img{
		margin-top: 0.07rem;
		width: 0.15rem;
		height: 0.15rem;
		
	}
		}
  }
}

.hidden-style {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 0.32rem;
  word-wrap: break-word;
  font-size: 10px;
}

.pop-item {
  overflow: hidden;
  font-size: 0.14rem;
  color: #333;
  text-align: center;
  .title {
    font-family: Arial-BoldMT;
    font-size: 0.14rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.24rem;
    letter-spacing: 0px;
    color: #333333;
    max-height: 40px;
  }
  .text {
    margin-top: 0;
    margin-bottom: 17px;
    font-size: 0.14rem;
    color: #666;
    span {
      font-size: 16px;
      color: #e1251b;
    }
  }
}

.footer1 {
  background-color: #ebebeb;
  padding-bottom: 0.25rem;
  	/deep/ img{
			width: 0.5rem;
		}
  .contain {
    display: flex;
    box-sizing: border-box;
    margin: 0 auto;
    margin: 0.25rem;
    margin-top: 0;
    padding: 0.2rem;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 0;
  }
  .main-title {
    padding: 0.15rem 0.25rem;
    font-size: 0.18rem;
    font-family: Allstar4;
    white-space: nowrap;
    font-weight: bold;
    color: #142a43;
    text-align: left;
    display: flex;
    align-items: center;
    .border-style {
      width: 3px;
      height: 9px;
      background-color: #e10e0d;
      border-radius: 1px;
      margin-right: 9px;
    }
  }
  .contain {
    text-align: left;
  }
}
</style>
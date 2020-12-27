<template>
  <div>
    <div>
      <div class="nav">
        {{ gameList.buyNotes }}
        <img src="../../assets/image/icon/icon_home.png" />Home >
        {{ gameName }} > {{ gameList.coinName }}
      </div>
      <div
        class="step-line"
        style="display: flex; justify-content: space-between"
      >
        <div
          v-if="
            gameList.productSell == 'both,both' ||
            gameList.productSell == 'coin,coin'
          "
          :class="selectType == 'coin' ? 'item active point' : 'item point'"
          @click="$router.push('/coinList/' + $route.params.id)"
        >
          <img src="../../assets/image/icon/icon_coin.png" />
          <span> {{ gameList.coinName || "Silver" }}</span>
        </div>
        <div
          v-if="
            gameList.productSell == 'both,both' ||
            gameList.productSell == 'item,item'
          "
          :class="selectType == 'item' ? 'item active point' : 'item point'"
          @click="$router.push('/itemList/' + $route.params.id)"
        >
          <img src="../../assets/image/icon/icon_item.png" />
          <span>{{ gameList.itemName || "Items" }}</span>
        </div>
      </div>
      <el-dropdown v-if="categoryList.length > 0">
        <span class="el-dropdown-link">
          {{ selectCategoryData.name
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu class="menu-li" slot="dropdown">
          <el-dropdown-item
            @click.native="selectCategory(item)"
            v-for="(item, index) in categoryList"
            v-if="categoryList.length > 0"
            :key="item.id"
            @click="selectCategory(item)"
            :class="item.id == categoryId ? 'active point' : 'point'"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-if="serveList.length > 0">
        <span class="el-dropdown-link">
          {{ selectServeData.name
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu class="menu-li" slot="dropdown">
          <el-dropdown-item
            @click.native="selectServe(item)"
            v-for="(item, index) in serveList"
            v-if="serveList.length > 0"
            :key="item.id"
            :class="item.id == serveId ? 'active point' : 'point'"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-if="itemList.length > 0">
        <span class="el-dropdown-link">
          {{ selectName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu class="menu-li" slot="dropdown">
          <el-dropdown-item
            @click.native="
              selectId = item.id;
              selectName = item.name;
              totalPrice = 0;
              coinNum = 0;
              filterId();
            "
            v-for="(item, index) in itemList"
            v-if="itemList.length > 0"
            :key="item.id"
            :class="item.id == selectId ? 'active point' : 'point'"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <div class="step-line item-contain">
        <!-- <div class="flex-style">
          <div class="select-title">
            You Have Selected:<span style="color: #333"
              >{{ selectCategoryData.name }}
              <span v-if="selectCategoryData.name">-</span>
              {{ selectServeData.name }}
            </span>
          </div>
        </div> -->

        <!-- <div class="tab point">
        
        </div> -->
        <div class="main-title">
          <span> Quantity: </span>
          <el-select
            @change="setCurrency"
            style="width: 1rem; height: 0.32rem"
            v-model="selectCurrency"
            placeholder=""
          >
            <el-option
              v-for="(subItem, subIndex) in currencyData"
              :key="subItem.id"
              :label="subItem.showName"
              :value="subItem.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="total">
          <input
            onafterpaste="this.value=this.value.replace(/\D/g,'')"
            @change="changeNum(coinNum)"
            :placeholder="selectData[0] ? selectData[0].miniNumber : ''"
            type="number"
            :min="selectData[0] && selectData[0].miniNumber"
            class="input-style"
            v-model="coinNum"
          />
          <span class="custom-quantity">
            {{ selectData[0] && selectData[0].Unit }}</span
          >
          <span class="price" 
            >{{ currencyInfo.symbol
            }}{{ (totalPrice * 1 * currencyInfo.rate).toFixed(2) }}</span
          >
          <span class="option"
            ><span
              class="buy point"
              style="margin-right: 0.1rem"
              @click="
                addCart(
                  selectData[0],
                  selectId,
                  totalPrice,
                  selectData[0] && selectData[0].name + '*' + coinNum,
                  '',
                  1,
                  1
                )
              "
              >Buy Now</span
            ></span
          >
        </div>
        <div class="li" v-for="(item, index) in discountList" :key="item.id">
          <div class="left" style="width: 50%">
            <span class="custom-quantity hidden-style">
              {{ selectServeData.name }} {{ item.name }} {{ item.qty || 1 }}
              {{ selectData[0] && selectData[0].Unit }}
            </span>

            <span class="serve-name" v-html="item.selltext"></span>
          </div>
          <div class="right">
            <div class="price">
              {{ currencyInfo.symbol
              }}{{
                (
                  (item.totalPrice || item.price) *
                  1 *
                  currencyInfo.rate
                ).toFixed(2)
              }}
            </div>
            <div class="option">
              <span
                class="point"
                @click="
                  addCart(
                    item,
                    selectId,
                    item.totalPrice || item.price,
                    item.name + '*' + item.qty,
                    '',
                    1
                  )
                "
                >Add Cart</span
              >
              <span
                class="buy point"
                @click="
                  addCart(
                    item,
                    selectId,
                    item.totalPrice || item.price,
                    item.name + '*' + item.qty,
                    '',
                    1,
                    1
                  )
                "
                >Buy Now</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="split"></div>
    <div class="footer1" v-if="gameList.description">
      <div class="main-title">
        <span class="border-style"></span>Introduction
      </div>
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
      gameList: {},
      gameName: localStorage.getItem("gameName"),
      discountList: [],
      selectType: "coin",
      selectId: "",
      coinNum: "",
      newArray: [],
      selectData: [],
      currencyData: [],
      selectCurrency: "",
      lowPrice: "",
      plane: [],
      selectServeData: {},
      discountListAll: [],
      categoryList: [],
      selectCategoryData: [],
      categoryId: "",
      totalPrice: 0,
      selectName: "",
    };
  },
  computed: {
    ...mapState([
      "login",
      "showMoveImg",
      "showCart",
      "currencyInfo",
      "currencyInfo",
    ]),
  },
  methods: {
    ...mapMutations(["ADD_CART", "SHOW_LOGIN", "CHOOSE_CURRENCY"]),
    mapCount(data) {
      var num = this.coinNum;
      if (num == 0 || data.length == 0) return;
      data = data.reverse();
      data.map((item, index) => {
        if (num == 0) return;
        if (index == data.length - 1) {
          if (num * 1 <= item.qty * this.selectData[0].miniNumber) {
            item.buyNum = 1;
            num = 0;
            return;
          } else {
            item.buyNum = Math.ceil(
              (num * 1) / (item.qty * this.selectData[0].miniNumber)
            );
            num = 0;
            return;
          }
        }
        if ((num * 1) % (item.qty * this.selectData[0].miniNumber) == 0) {
          item.buyNum = parseInt(
            (num * 1) / (item.qty * this.selectData[0].miniNumber)
          );
          num = 0;
        } else if (
          (num * 1) % (data[index + 1].qty * this.selectData[0].miniNumber) ==
          0
        ) {
          data[index + 1].buyNum = parseInt(
            (num * 1) / (data[index + 1].qty * this.selectData[0].miniNumber)
          );
          num = 0;
        } else {
          item.buyNum = parseInt(
            (num * 1) / (item.qty * this.selectData[0].miniNumber)
          );
          num = (num * 1) % (item.qty * this.selectData[0].miniNumber);
        }
      });
      this.totalPrice2(data);
    },
    changeNum() {
      this.coinNum = this.coinNum.replace(/\D/g, "");
      var that = this;
      this.newArray = JSON.parse(JSON.stringify(this.discountList));
      this.lowPrice = "";
      this.plane = [];
      var totalPrice = 0;
      if (this.coinNum < this.selectData[0].miniNumber) {
        this.$message({
          type: "error",
          message: "The minimum quantity is " + this.selectData[0].miniNumber,
        });
        this.coinNum = this.selectData[0].miniNumber;
        return;
      }
      if (this.coinNum > this.newArray[this.newArray.length - 1].qty) {
        this.totalPrice =
          this.coinNum * this.newArray[this.newArray.length - 1].price;
        return;
      }
      this.newArray.map((item, index) => {
        if (
          this.coinNum >= item.qty &&
          this.coinNum < this.newArray[index + 1] &&
          this.newArray[index + 1].qty
        ) {
          this.totalPrice = item.price * this.coinNum;
        }
      });
    },
    totalPrice2(data) {
      var price = 0;
      data.map((item) => {
        if (item.buyNum) {
          price = price + item.qty * item.buyNum * 1 * item.price;
        }
      });
      if (this.lowPrice == 0 || price < this.lowPrice) {
        this.lowPrice = price;
        this.plane = data;
      }
    },
    setCurrency(a) {
      var data = this.currencyData.filter((item) => item.id == a);
      this.CHOOSE_CURRENCY({
        name: data[0].name,
        symbol: data[0].symbol,
        rate: data[0].rate,
        type: 1,
      });
    },
    addCart(item, id, price, name, img, productNum, addType, minNum) {
      if (price == 0 || productNum == 0) {
        return;
      }
      item.unit = item.Unit;
      this.ADD_CART({
        detail: item,
        productId: id,
        salePrice: price,
        productName: name,
        productImg: img,
        productNum: productNum,
        type: "coin",
        serveId: this.selectServeData.id,
        serveName: this.selectServeData.name,
        gameId: localStorage.gameId,
        gameName: localStorage.gameName,
        categoryName: this.selectCategoryData.name,
        categoryId: this.selectCategoryData.id,
      });
      if (addType == 1) {
        this.$router.push("/payPage");
      } else if (addType == 2) {
      } else {
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
            return (
              id == localStorage.getItem("gameId") &&
              item.online &&
              item.class == "coin,coin"
            );
          });
          this.imgUrl = window.imgUrl;
          if (this.categoryList.length > 0) {
            this.selectCategoryData = this.categoryList[0];
            this.categoryId = this.categoryList && this.categoryList[0].id;
            this.getServe();
          } else {
            this.getServe();
          }
          var resultArray = this.categoryList.sort(function compareFunction(
            param1,
            param2
          ) {
            return param1.name.trim().localeCompare(param2.name.trim(), "zh");
          });
          console.log(resultArray);
          this.categoryList = resultArray;
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
                item.coins.length > 2
              );
            }
            if (this.categoryId) {
              var id = item.category.split(",")[0];
              return (
                id == this.categoryId && item.online && item.coins.length > 2
              );
            } else {
              var id = item.game.split(",")[0];
              return (
                id == localStorage.getItem("gameId") &&
                item.online &&
                item.coins.length > 2
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
      this.selectServeData = item;
      this.serveId = item.id;
      this.getItem();
      this.$forceUpdate();
    },
    selectCategory(item) {
      this.selectCategoryData = item;
      this.categoryId = item.id;
      this.getServe();
      this.$forceUpdate();
    },
    getItem() {
      //获取item
      getTemplete("?type=Product&offset=-1&count=-1").then((response) => {
        if (response.retCode == 0) {
          this.itemList = [];
          this.selectServeData.coins &&
            JSON.parse(this.selectServeData.coins).map((subItem) => {
              response.data.map((item) => {
                if (
                  item.id == subItem.split(",")[0] &&
                  item.type == "coin,coin"
                ) {
                  item.price = this.selectServeData.price;
                  this.itemList.push(item);
                }
              });
            });
          if (this.itemList[0]) {
            this.selectId = this.itemList[0].id;
            this.selectName = this.itemList[0].name;
            this.filterId();
          } else {
            this.discountList = [];
          }
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
          var name = this.currencyInfo.name || this.currencyInfo.name;
          var currencyData = this.currencyData.filter(
            (item) => item.name == name
          );
          this.selectCurrency = currencyData[0].id;
          this.gameList = data[0];
          if (this.gameList.productSell == "item,item") {
            this.$router.replace("/itemList/" + this.$route.params.id);
          }
        } else {
          this.$message({
            type: "warning",
            message: response.message,
          });
        }
      });
    },
    filterId() {
      this.selectData = this.itemList.filter((item) => {
        return item.id == this.selectId;
      });
      this.selectData.map((item) => {
        item.price = this.selectServeData.price;
      });
      if (!this.selectData[0].discount) {
        this.selectData[0].qty = 1;
        this.discountList = this.selectData;
        return;
      }
      var discountId =
        this.selectData[0].discount &&
        this.selectData[0].discount.split(",")[0];
      if (this.discountListAll.length > 0) {
        this.filtData(discountId);
      } else {
        this.getDiscount(discountId);
      }
    },
    filtData(discountId) {
      var data = this.discountListAll.filter((item) => {
        return item.id == discountId;
      });
      this.discountList = JSON.parse(data[0].list);
      this.discountList.filter((item) => {
        var startTime = new Date(item.starttime + ":00");
        var endTime = new Date(item.endtime + ":00");
        return new Date() >= startTime && new Date() <= endTime;
      });
      this.discountList.map((item) => {
        item.name = this.selectData[0].name;
        if (this.selectData[0].price * 1 - item.discount > 0) {
          console.log(this.selectData[0].price);
          item.price = this.selectData[0].price * 1 - item.discount;
        } else {
          item.price = this.selectData[0].price * 1;
        }
        item.totalPrice = (item.price * 1 * (item.qty * 1)).toFixed(2);
      });
      this.coinNum = this.discountList[0].qty * 1;
      this.totalPrice = this.discountList[0].totalPrice;
    },
    getDiscount(discountId) {
      //获取discount
      getTemplete("?type=Discount&offset=-1&count=-1").then((response) => {
        if (response.retCode == 0) {
          this.discountListAll = response.data;
          this.filtData(discountId);
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
    //获取gameSilver
    this.getCategory();
    this.getGame();
  },
  //		watch: {
  //			coinNum() {
  //				this.changeNum();
  //			}
  //		}
};
</script>
<style lang="less" scoped="">
@import "../../assets/css/public.css";

.tab {
  text-align: left;
  width: 1162px;
  margin: 0 auto;
  border-bottom: 2px solid #fe852d;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  span {
    padding: 15px 20px;
    font-size: 14px;
    color: #333333;
    border-radius: 4px;
    &.active {
      background: #e1251b;
      background-blend-mode: normal, normal;
      color: #fff;
    }
  }
}

.step {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 0px;
  color: #333333;
  span {
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: #fdf2f1;
    border: solid 3px rgba(234, 111, 105, 0.4);
    font-family: Arial-BoldMT;
    font-size: 16px;
    letter-spacing: 0px;
    color: #e7534b;
    margin-right: 16px;
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

  font-family: PingFang-SC-Regular;
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
.step-line {
  padding: 0 0.26rem;
  .select-title {
    color: #999;
    font-size: 14px;
    padding-top: 20px;
    margin-bottom: 14px;
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
    margin-right: 20px;
    img {
      width: 0.21rem;
      height: 0.21rem;
      margin-right: 0.12rem;
    }
    &.active {
      background-color: #e1251b;
    }
  }
  .main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-family: PingFang-SC-Bold;
      margin: 0.2rem 0;
      font-size: 0.13rem;
      font-weight: bold;
      color: #333333;
    }
    /deep/ .el-input__inner {
      height: 0.32rem;
      line-height: 0.32rem;
    }
  }
}

.serve-contain {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 140px;
    text-align: center;
    padding: 14px 10px;
    font-size: 14px;
    border: 1px solid #efefef;
    margin-right: 20px;
    position: relative;
    margin-bottom: 20px;
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
        width: 20px;
        height: 20px;
        background: url(../../assets/image/icon/icon_check.png);
      }
    }
  }
}

.total {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 0.4rem;
  background-color: #feba00;
  align-items: center;
  .custom-quantity {
    font-size: 14px;
    color: #333333;
  }
  .price {
    font-family: PingFang-SC-Bold;
    font-size: 0.15rem;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #e1251b;
  }
  input {
    margin-left: 10px;
    width: 0.92rem;
    height: 0.28rem;
    font-weight: bold;
    background-color: #ffffff;
    border: solid 1px #e5e5e5;
    margin-right: 5px;
  }
  .option {
    span {
      text-align: center;
      color: #fff;
      display: inline-block;
      width: 0.75rem;
      height: 0.3rem;
      background-color: #4c9adb;
      border-radius: 2px;
      font-size: 0.12rem;
      line-height: 0.3rem;
      font-family: PingFang-SC-Medium;
    }
    .buy {
      margin-left: 13px;
      background-color: #e1251b;
    }
  }
}

.hidden-style {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.li {
  width: 100%;
  height: 0.8rem;
  background-color: #f5f5f5;
  border: solid 1px #dcdcdc;
  display: flex;
  justify-content: space-between;
  margin-top: 0.1rem;
  box-sizing: border-box;
  &:last-child {
    margin-bottom: 0.2rem;
  }
  .left {
    font-family: PingFang-SC-Regular;
    font-size: 0.12rem;
    color: #333;
    padding-left: 0.1rem;
    .custom-quantity {
      font-family: PingFang-SC-Bold;
      font-size: 0.13rem;
      font-weight: bold;
      margin: 0.15rem 0 0.22rem;
    }
  }
  .right {
    padding-right: 0.1rem;
  }
  .price {
    text-align: right;
    margin-top: 0.1rem;
    margin-bottom: 0.12rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    font-size: 0.15rem;
    color: #f3940e;
  }

  .option {
    span {
      width: 0.3rem;
      height: 0.3rem;
      background-color: #4c9adb;
    }
    .buy {
      text-align: center;
      color: #fff;
      display: inline-block;
      width: 0.75rem;
      height: 0.3rem;

      border-radius: 2px;
      font-size: 0.12rem;
      line-height: 0.3rem;
      font-family: PingFang-SC-Medium;
      margin-left: 2px;
      background-color: #e1251b;
    }
  }
}

.split {
  width: 100%;
  height: 0.125rem;
  background-color: #f5f5f5;
}
.footer1 {
  background-color: #ebebeb;
  padding-bottom: 0.25rem;
  .contain {
    display: flex;
    box-sizing: border-box;
    margin: 0 auto;
    margin: 0.25rem;
    margin-top: 0;
    padding: 20px;
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
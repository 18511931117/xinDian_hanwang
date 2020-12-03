<template>
  <div>
    <div class="title-top">
      <div class="box">
        <div class="box-left">
          <p class="text">今日装箱数量</p>
          <p class="count">{{todayPack}}</p>
          <span>件</span>
        </div>
        <div class="box-right">
          <i class="fill"></i>
        </div>
      </div>
      <div class="box item2">
        <div class="box-left">
          <p class="text">今日发货数量</p>
          <p class="count">{{todaySend}} </p>
          <span>件</span>
        </div>
        <div class="box-right">
          <i class="car_green"></i>
        </div>
      </div>
      <div class="box item2">
        <div class="box-left">
          <p class="text">总装箱数量</p>
          <p class="count">{{totalPack}}</p>
          <span>件</span>
        </div>
        <div class="box-right">
          <i class="home"></i>
        </div>
      </div>
      <div class="box item2">
        <div class="box-left">
          <p class="text">总发货数量</p>
          <p class="count">{{totalSend}}</p>
          <span>件</span>
        </div>
        <div class="box-right">
          <i class="car_red"></i>
        </div>
      </div>
    </div>
    <div class="echarts-bottom">
      <div class="echarts-text">
        <div class="ecarts-left">
          <p>装箱、发货统计</p>
        </div>
        <div class="ecarts-right">
          <div class="tabs">
            <ul>
              <li :class="{active:show==1}" @click="leftWeek">本周</li>
              <li :class="{active:show==2}" @click="leftMonth">本月</li>
            </ul>
          </div>
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="selectTime"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="echats-warp">
        <div class="count-text">
          <p>
            {{text}}装箱总数量：
            <span>{{totalPackDate}}</span>件
          </p>
          <p>
            {{text}}发货总数量：
            <span>{{totalSendDate}}</span>件
          </p>
        </div>
        <div id="box" ref="box" style="width:100%;height:600px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { indexApi, echartsApi } from "../../../api";
export default {
  data() {
    return {
      activeName: "first",
      value1: "",
      show: 1,
      todayPack: "",
      todaySend: "",
      totalPack: "",
      totalSend: "",
      text: "",
      text2: "",
      totalPackDate: "",
      totalSendDate: "",
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    init() {
      this.leftWeek();
      this.boxIndex();
    },
    selectTime() {
      console.log(this.value1);
      echartsApi({
        startTime:this.value1[0],
        endTime:this.value1[1],
      }).then(res => {
        this.week1 = res.data.data.date;
        this.packDate = res.data.data.packDate;
        this.sendDate = res.data.data.sendDate;
        this.totalPackDate = res.data.data.totalPackDate;
        this.totalSendDate = res.data.data.totalSendDate;
        this.drawLine();
      })
    },
    boxIndex() {
      indexApi().then((res) => {
        this.todaySend = res.data.data.todaySend;
        this.todayPack = res.data.data.todayPack;
        this.totalPack = res.data.data.totalPack;
        this.totalSend = res.data.data.totalSend;
      });
    },
    handleClick(tab, event) {
    },
    leftWeek() {
      this.show = 1;

      echartsApi({
        week: 1,
      }).then((res) => {
        this.week1 = res.data.data.date;
        this.packDate = res.data.data.packDate;
        this.sendDate = res.data.data.sendDate;
        this.totalPackDate = res.data.data.totalPackDate;
        this.totalSendDate = res.data.data.totalSendDate;
        this.text = "本周";
        this.drawLine();
      });
    },
    leftMonth() {
      this.show = 2;
      echartsApi({
        mon: 0,
      }).then((res) => {
        this.week1 = res.data.data.date;
        this.packDate = res.data.data.packDate;
        this.sendDate = res.data.data.sendDate;
        this.totalPackDate = res.data.data.totalPackDate;
        this.totalSendDate = res.data.data.totalSendDate;
        this.text = "本月";
        this.drawLine();
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例，所以只能在mounted中调用
      let myChart = this.$echarts.init(this.$refs.box);
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#fff",
        grid: {
          left: "5%",
          right: "5%",
          top: "20%",
          bottom: "15%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        legend: {
          show: true,

          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#000000",
          },
          right: "10",
          top: "2%",
          data: ["装箱数", "发货数"],
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // axisLabel: {
            //     color: fontColor
            // },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#000",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#000",
              },
            },
            data: this.week1,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "件",
            // min: 0,
            // max: 500,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#000",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#000",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(135,140,147,0.5)",
                type: "dotted",
              },
            },
          },
        ],
        series: [
          {
            name: "发货数",
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#E85F49",
                lineStyle: {
                  color: "#E85F49",
                  width: 1,
                },
                //           areaStyle: {
                // 			//color: '#94C9EC'
                // 			color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                // 				offset: 0,
                // 				color: 'rgba(7,44,90,0.3)'
                // 			}, {
                // 				offset: 1,
                // 				color: 'rgba(0,146,246,0.9)'
                // 			}]),
                //           }
              },
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: "red",
                },
              },
            },
            data:this.sendDate,
          },
          {
            name: "装箱数",
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 8,

            itemStyle: {
              normal: {
                color: "#3DA2DB",
                lineStyle: {
                  color: "#3DA2DB",
                  width: 1,
                },
              },
            },
            data: this.packDate,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.title-top {
  display: flex;
  height: 110px;
}
.box {
  flex: 1;
  /* margin-left: 15px; */
  background: #fff;
  padding: 15px;
  box-sizing: content-box;
  display: flex;
}
.box-left {
  flex: 1;
}
.box-right {
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-left .text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.box-left .count {
  display: inline-block;
  font-size: 30px;
  color: #000000;
}
.item2 {
  margin-left: 15px;
}
.fill {
  width: 54px;
  height: 54px;
  display: inline-block;
  background: url("../../../assets/Fill.png") no-repeat;
}
.car_green {
  width: 54px;
  height: 54px;
  display: inline-block;
  background: url("../../../assets/car_green.png") no-repeat;
}
.home {
  width: 54px;
  height: 54px;
  display: inline-block;
  background: url("../../../assets/home.png") no-repeat;
}
.car_red {
  width: 54px;
  height: 54px;
  display: inline-block;
  background: url("../../../assets/car_red.png") no-repeat;
}
.echarts-text {
  height: 60px;
  display: flex;
  line-height: 60px;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 15px;
}
.ecarts-left p {
  color: #000;
  font-size: 16px;
}
.ecarts-right {
  display: flex;
}
.echarts-bottom {
  background: #fff;
  margin-top: 15px;
}
.tabs ul {
  display: flex;
  margin-top: 10px;
  margin-right: 15px;
}
.tabs ul li {
  width: 70px;
  text-align: center;
  height: 38px;
  line-height: 38px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.tabs ul li.active {
  border: 1px solid #e85f49;
  color: #e85f49;
}
.echats-warp {
  position: relative;
}
.count-text {
  display: flex;
  position: absolute;
  top: 15px;
  z-index: 2;
}
.count-text p {
  margin-left: 15px;
}
</style>
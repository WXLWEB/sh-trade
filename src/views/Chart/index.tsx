import * as React from 'react';
require('../../resources/scripts/jquery.min.js');
// import 'charting_library/js/jquery-2.1.0.min.js';
// import 'charting_library/charting_library/charting_library.min.js';
// import 'charting_library/charting_library/datafeed/udf/datafeed.js';
import Box from '@/components/Box';
import env from '@/constants/env';
import './index.less';

let chart:any = null;

export type ChartProps = Readonly<any>;
export type ChartState = Readonly<any>;

export default class Chart extends React.Component<ChartProps, ChartState>{

  // generatorChart = () => {
  //    const lang = this.props.lang;
  //    const theme = this.props.theme;
  //    const whiteTheme = {
  //       'scalesProperties.lineColor' : '#E1E1E1',
  //       'symbolWatermarkProperties.transparency': 90, //
  //       'paneProperties.background': '#fff', // kline panel
  //       'paneProperties.gridProperties.color': '#ccc',
  //       'mainSeriesProperties.style': 1,
  //       'mainSeriesProperties.areaStyle.color1': '#606090',
  //       'mainSeriesProperties.areaStyle.color2': '#01F6F5',
  //       'mainSeriesProperties.areaStyle.linecolor': '#0094FF',
  //       // 'mainSeriesProperties.areaStyle.linestyle': CanvasEx.LINESTYLE_SOLID,
  //       'mainSeriesProperties.areaStyle.linewidth': 1,
  //       'mainSeriesProperties.areaStyle.priceSource': 'close',
  //       'mainSeriesProperties.areaStyle.transparency': 50,
  //    }
  //    const blackTheme = {
  //       "paneProperties.background": "#141414", // kline panel
  //       "paneProperties.gridProperties.color": "#222",
  //       "symbolWatermarkProperties.transparency": 90, //
  //       "scalesProperties.textColor" : "#565A5D",
  //       "scalesProperties.lineColor" : "#303030",
  //       "scalesProperties.showLeftScale" : false,
  //       "scalesProperties.showRightScale" : true,
  //       "scalesProperties.backgroundColor" : "#141414",
  //       "volumePaneSize": "large",
  //       //  Candles styles
  //       "mainSeriesProperties.candleStyle.upColor": "#28A631",
  //       "mainSeriesProperties.candleStyle.downColor": "#BD2B35"
  //    }
  //    chart = new TradingView.widget({
  //      width: '100%',
  //      height: '100%',
  //      fullscreen: false,
  //      symbol: this.props.symbol,
  //      interval: '60',
  //      timezone: 'Asia/Shanghai',
  //      container_id: 'chart_container',
  //      allow_symbol_change: false,
  //      theme: theme,
  //      datafeed: new Datafeeds.UDFCompatibleDatafeed(env.CHART_URL),
  //      library_path: 'trade/charting_library/',
  //      locale: lang,
  //      drawings_access: {type: 'black', tools: [{name: 'Regression Trend'}]},
  //      disabled_features: ['left_toolbar', 'link_to_tradingview', 'use_localstorage_for_settings', 'header_symbol_search', 'header_fullscreen_button', 'header_screenshot'],
  //      client_id: 'tradingview.com',
  //      user_id: 'public_user_id',
  //      preset: 'mobile',
  //      toolbar_bg: theme === 'white' ? '#fff' : '#141414',
  //      overrides: theme === 'white' ? whiteTheme : blackTheme,
  //    });
  // }
  //
  // componentDidMount() {
  //   if (chart == null) {
  //     this.generatorChart();
  //   }
  // }
  //
  // componentWillUnmount() {
  //   if (chart != null) {
  //     chart.remove();
  //     chart = null;
  //   }
  // }

  public render(){
    return(
      <div className="chart">
        <Box
          title={`BTC/CNZ ≈ ${60000} CNY 24H涨幅`}>
          <div id='chart_container'>
          </div>
        </Box>
      </div>
    )
  }
}

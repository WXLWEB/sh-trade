import * as React from 'react';
import { connect } from 'react-redux';
import 'charting_library/charting_library/charting_library.min.js';
import 'charting_library/charting_library/datafeed/udf/datafeed.js';
import Box from '@/components/Box';
import env from '@/constants/env';
import { getBuyUnit } from '@/utils/symbol';
import Filter from '@/Filter';
import './index.less';

let chart:any = null;

interface ChartProps {
  readonly lang: string;
  readonly theme: string;
  readonly symbol: string;
  readonly activeContracts: any;
}
export type ChartState = Readonly<any>;

class Chart extends React.Component<ChartProps, ChartState>{

  generatorChart = () => {
     const lang = this.props.lang;
     const theme = this.props.theme;
     chart = new TradingView.widget({
       width: '100%',
       height: '100%',
       fullscreen: false,
       symbol: this.props.symbol,
       interval: '60',
       timezone: 'Asia/Shanghai',
       container_id: 'chart_container',
       allow_symbol_change: false,
       theme: theme,
       datafeed: new Datafeeds.UDFCompatibleDatafeed(env.CHART_URL + '/data/udf'),
       library_path: '/charting_library/',
       locale: lang,
       drawings_access: {type: 'black', tools: [{name: 'Regression Trend'}]},
       disabled_features: [
         'left_toolbar',
         'link_to_tradingview',
         'use_localstorage_for_settings',
         'control_bar',
         'header_chart_type',
         // 'header_interval_dialog_button',
         // 'show_interval_dialog_on_key_press',
         'header_symbol_search',
         'header_settings',
         'header_indicators',
         'header_compare',
         'header_undo_redo',
         'header_fullscreen_button',
         'header_screenshot',
         'timeframes_toolbar'
       ],
       preset: 'mobile',
       useLocalStorage: false,
       toolbar_bg: '#fff',
       overrides: {
         'scalesProperties.lineColor' : '#fff',
         'symbolWatermarkProperties.transparency': 100, //
         'paneProperties.background': '#fff', // kline panel
         'paneProperties.gridProperties.color': '#ccc',
         'mainSeriesProperties.style': 1,
         //  Candles styles
         'mainSeriesProperties.candleStyle.upColor': '#6ba583',
         'mainSeriesProperties.candleStyle.downColor': '#d75442',
         'mainSeriesProperties.candleStyle.drawWick': true,
         'mainSeriesProperties.candleStyle.drawBorder': true,
         'mainSeriesProperties.candleStyle.borderColor': '#378658',
         'mainSeriesProperties.candleStyle.borderUpColor': '#225437',
         'mainSeriesProperties.candleStyle.borderDownColor': '#5b1a13',
         'mainSeriesProperties.candleStyle.wickColor': '#737375',
         'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false
       },
       studies_overrides: {
         'volume.show ma': false,
         'bollinger bands.median.color': '#33FF88',
         'bollinger bands.upper.linewidth': 7,
       },
       favorites:{
          intervals: ['60', '120', '720', '1D', '1W', '1Y']
        }
     });
  }

  componentDidMount() {
    if (chart == null) {
      this.generatorChart();
    }
  }

  componentWillUnmount() {
    if (chart != null) {
      chart.remove();
      chart = null;
    }
  }

  public render(){
    const { symbol, ticker, activeContracts } = this.props;
    return(
      <div className='chart'>
        <Box
          title={<div>
            {symbol} ≈ {ticker.get("LastPrice")} {getBuyUnit(symbol)}
            <span className="key"> 24H涨幅: </span><span className={ticker.get("Percent") > 0 ? 'green' : 'red'}><Filter value={ticker.get("Percent")} keyname='decimal: 2'/>%</span>
            <span className="key"> 24H最高: </span><Filter value={ticker.get("High")} keyname={`decimal: ${activeContracts.currentPriceDecimal}`}/>
            <span className="key"> 24H最低: </span><Filter value={ticker.get("Low")} keyname={`decimal: ${activeContracts.currentPriceDecimal}`}/>
            <span className="key"> 24H成交: </span><Filter value={ticker.get("Volume24H")} keyname={`decimal: ${activeContracts.currentPriceDecimal}`}/>
          </div>}>
          <div id='chart_container'>
          </div>
        </Box>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    lang: state.locales.get('lang'),
    ticker: state.ticker,
    activeContracts: state.activeContracts,
  };
}


export default connect(
  mapStateToProps,
)(Chart);

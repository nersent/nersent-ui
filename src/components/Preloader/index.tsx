import * as React from "react";
import { SyntheticEvent } from "react";

// Defaults
import colors from "../../defaults/colors";

// Enums
import PreloaderType from "../../enums/preloader";

// Styles
import { Path, StyledPreloader } from "./styles";

export interface IProps {
  className?: string;
  style?: {};
  color?: string;
  type?: PreloaderType;
  thickness?: number;
}

export interface IState {
  color: string;
}

export default class Preloader extends React.Component<IProps, IState> {
  public static defaultProps = {
    type: PreloaderType.Indeterminate,
    thickness: 4
  };

  public state: IState = {
    color: colors.red["500"]
  }

  private colorChange: any;
  private actualColor = 0;

  private defaultColors = [
    colors.red["500"],
    colors.yellow["500"],
    colors.green["500"],
    colors.lightBlue["500"]
  ];

  public componentDidMount () {
    if (this.props.color == null && this.props.type === PreloaderType.Indeterminate) {
      this.colorChange = setInterval(this.changeColor, 1500)
    }
  }

  public componentWillReceiveProps (nextProps) {
    const colorChanged = this.props.color !== nextProps.color;

    if (colorChanged && nextProps.color != null && this.colorChange != null) {
      clearInterval(this.colorChange);
    } else if (colorChanged && nextProps.color == null && this.props.type === PreloaderType.Indeterminate) {
      this.colorChange = setInterval(this.changeColor, 1500)
    }
  }

  public changeColor = () => {
    this.actualColor++;

    if (this.actualColor >= this.defaultColors.length) {
      this.actualColor = 0;
    }

    this.setState({
      color: this.defaultColors[this.actualColor]
    })
  }

  public render() {
    const {
      className,
      style,
      color,
      type,
      thickness
    } = this.props;

    const pathColor = color == null ? this.state.color : color;

    return (
      <StyledPreloader className={className} style={style}>
        <svg viewBox='25 25 50 50'>
          <Path
            cx='50'
            cy='50'
            r='20'
            fill='none'
            strokeMiterlimit='10'
            color={pathColor}
            thickness={thickness}
          />
        </svg>
      </StyledPreloader>
    );
  }
}
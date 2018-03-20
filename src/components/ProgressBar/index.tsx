import * as React from "react";
import { SyntheticEvent } from "react";

// Defaults
import colors from "../../defaults/colors";

// Enums
import ProgressBarType from "../../enums/progressBar";

// Styles
import { Background, Line, StyledProgressBar } from "./styles";

export interface IProps {
  className?: string;
  style?: {};
  color?: string;
  type?: ProgressBarType;
  progress?: number;
}

export interface IState {
  firstLineMargin: number;
  secondLineMargin: number;
  linesAnimation: boolean;
}

export default class ProgressBar extends React.Component<IProps, IState> {
  public static defaultProps = {
    raised: false,
    disabled: false,
    color: colors.blue["500"],
    type: ProgressBarType.Indeterminate,
    progress: 50
  };

  public state: IState = {
    firstLineMargin: 0,
    secondLineMargin: 0,
    linesAnimation: false
  };

  public componentDidMount () {
    if (this.props.type === ProgressBarType.Indeterminate) {
      this.setState({
        firstLineMargin: -50,
        secondLineMargin: -50,
        linesAnimation: true
      })

      setTimeout(() => {
        this.animate()
      })
    }
  }

  public animate () {
    this.setState({
      firstLineMargin: 125
    })

    setTimeout(() => {
      this.setState({
        secondLineMargin: 100
      })

      setTimeout(() => {
        this.setState({
          linesAnimation: false
        })

        setTimeout(() => {
          this.setState({
            firstLineMargin: -50,
            secondLineMargin: -50
          })
        }, 1000)
      }, 1000);
    }, 850)
  };

  public render() {
    const {
      className,
      style,
      color,
      progress,
      type
    } = this.props;

    const {
      firstLineMargin,
      secondLineMargin,
      linesAnimation
    } = this.state;

    const firstLineProgress =
      type === ProgressBarType.Determinate && progress ||
      type === ProgressBarType.Indeterminate && 50;

    return (
      <StyledProgressBar>
        <Background color={color} />
        <Line
          color={color}
          progress={firstLineProgress}
          type={type}
          margin={firstLineMargin}
          fast={false}
          linesAnimation={linesAnimation}
        />
        {type === ProgressBarType.Indeterminate &&
          <Line
            color={color}
            progress={progress}
            type={type}
            margin={secondLineMargin}
            fast={true}
            linesAnimation={linesAnimation}
          />
        }
      </StyledProgressBar>
    );
  }
}
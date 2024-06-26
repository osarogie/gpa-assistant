import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { connect } from 'react-redux'

// import ModalSelector from 'react-native-modal-selector'
// import { resolve } from 'any-promise')
import { CommonActions } from '@react-navigation/native'

import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { Row } from '@/components/Row'
import { Screen } from '@/components/Screen'
import { Caption, Subtitle, Text } from '@/components/Text'

import { GradesEditor } from '../components/GradesEditor'
import { NumberSelector } from '../components/NumberSelector'
import { Stepper } from '../components/Stepper'
import { Toolbar } from '../components/Toolbar'
import { initField } from '../redux/actions'
import { YELLOW } from '@/ui'

class SettingsX extends React.Component {
  state = {
    name: '',
    numOfYears: 4,
    currentLevel: 1,
    currentSemester: 1,
    structure: {},
    courses: {},
    levelWeight: {
      1: 0.05,
      2: 0.2,
      3: 0.35,
      4: 0.4,
    },
  }

  changeCurrentLevel = (currentLevel) => {
    this.setState({ currentLevel })
  }

  changeFieldName = (name) => {
    this.setState({ name })
  }

  changeCurrentSemester = (currentSemester) => {
    this.setState({ currentSemester })
  }

  changeNumOfYears = (obj) => {
    const currentLevel = Math.min(obj, this.state.currentLevel)
    this.setState({ numOfYears: obj, currentLevel })
  }

  save = () => {
    this.setState({ grades: this.gradeEditor.getGrades() }, () => {
      this.props.dispatch(
        initField({
          ...this.state,
        })
      )
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      })
      this.props.navigation.dispatch(resetAction)
    })
  }
  changeLevelWeight = (data) =>
    this.setState((prev) => ({
      levelWeight: { ...prev.levelWeight, ...data },
    }))

  renderNumOfYears = () => {
    const { numOfYears } = this.state
    const data = [
      {
        key: 0,
        section: true,
        label: 'Years required',
      },
      ...Array.from(new Array(10), (val, index) => ({
        key: ++index,
        label: `${index} year${index === 1 ? '' : 's'}`,
      })),
    ]

    return (
      <Row style={styles.underline}>
        <Subtitle styleName="flexible">Years required</Subtitle>
        {/* <ModalSelector
          data={data}
          initValue={data[numOfYears].label}
          onChange={this.changeNumOfYears}
          style={{ width: 150 }}
        /> */}
        <Stepper
          label={numOfYears === 1 ? ' Year' : ' Years'}
          min={1}
          containerStyle={{
            justifyContent: 'flex-end',
          }}
          max={10}
          onValueChange={this.changeNumOfYears}
          initialValue={numOfYears || 1}
        />
      </Row>
    )
  }

  render() {
    const { name, currentSemester, currentLevel, numOfYears } = this.state

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: YELLOW }}>
        <Toolbar
          showNavIcon
          title="Field of Study"
          // rightComponent={
          //   <TouchableOpacity onPress={this.save}>
          //     <Text style={{ color: '#000' }} styleName="h-right">
          //       Save
          //     </Text>
          //   </TouchableOpacity>
          // }
        />
        <ScrollView
          style={{ backgroundColor: '#fff' }}
          contentContainerStyle={{ padding: 10 }}
        >
          <Screen>
            <Divider styleName="section-header" />

            {this.renderNumOfYears()}
            <Divider styleName="section-header">
              <Caption>ACADEMIC INFORMATION</Caption>
            </Divider>

            <Row>
              <Subtitle styleName="flexible">Your Current level</Subtitle>
              {/* <NumberSelector
            max={numOfYears}
            value={currentLevel}
            onChangeNumber={this.changeCurrentLevel}
          /> */}
              <Stepper
                label={`00 Level`}
                min={1}
                containerStyle={{
                  justifyContent: 'flex-end',
                }}
                max={numOfYears}
                onValueChange={this.changeCurrentLevel}
                initialValue={currentLevel}
              />
            </Row>
            <Row style={styles.underline}>
              <Subtitle styleName="flexible">Your Current semester</Subtitle>
              <NumberSelector
                max={2}
                value={currentSemester}
                onChangeNumber={this.changeCurrentSemester}
              />
            </Row>

            <GradesEditor
              grades={this.props.grades}
              ref={(gradeEditor) => (this.gradeEditor = gradeEditor)}
            />
            <Divider />
            <Divider />
          </Screen>
        </ScrollView>
        <Toolbar
          light
          rightComponent={
            <Button
              style={{
                backgroundColor: '#ffd200',
                width: 100,
                borderRadius: 20,

                alignSelf: 'flex-end',
              }}
              onPress={this.save}
            >
              <Text style={{ color: '#000' }} styleName="h-right">
                Save
              </Text>
            </Button>
          }
        />
      </SafeAreaView>
    )
  }
}

const Settings = connect((state) => ({ grades: state.field.grades }))(SettingsX)

export class SetFieldScreen extends React.PureComponent {
  render() {
    const { navigation } = this.props
    return <Settings navigation={navigation} />
  }
}

const styles = {
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' },
}

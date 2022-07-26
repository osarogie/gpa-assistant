import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import { Divider } from '@shoutem/ui/components/Divider'
import { Row } from '@shoutem/ui/components/Row'
import { Screen } from '@shoutem/ui/components/Screen'
import { Caption, Subtitle } from '@shoutem/ui/components/Text'
import { TextInput } from '@shoutem/ui/components/TextInput'

import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
// import { NumberSelector } from '../components/NumberSelector'
import { Toolbar } from '../components/Toolbar'
import { updateField, updateSchool } from '../redux/actions'

const mapStateToProps = (state) => ({
  school: state.school,
  field: state.field,
  gradingSystem: state.school.gradingSystem,
})

// const width = Dimensions.get('window').width

class AdvanceSettingsX extends React.Component {
  componentDidMount() {
    // this.school.focus()
  }

  changeGradingSystem = (data) =>
    this.props.dispatch(updateSchool({ gradingSystem: { $merge: data } }))

  changeYearWeight = ({ year, weight }) =>
    this.props.dispatch(
      updateField({
        levelWeight: { $auto: { [year]: { $set: Number(weight) / 100 } } },
      })
    )

  render() {
    const { field, gradingSystem } = this.props

    return (
      <View>
        <Divider styleName="section-header">
          <Caption>GRADING SYSTEM</Caption>
        </Divider>
        <Row>
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Subtitle style={{ flex: 1 }}>First Class</Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.firstClass)}
                onChangeText={(firstClass) =>
                  this.changeGradingSystem({ firstClass: Number(firstClass) })
                }
              />
            </View>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Subtitle style={{ flex: 1 }}>
                Second Class (UPPER DIVISION)
              </Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.secondClassUpper)}
                onChangeText={(secondClassUpper) =>
                  this.changeGradingSystem({
                    secondClassUpper: Number(secondClassUpper),
                  })
                }
              />
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Subtitle style={{ flex: 1 }}>
                Second Class (LOWER DIVISION)
              </Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.secondClassLower)}
                onChangeText={(secondClassLower) =>
                  this.changeGradingSystem({
                    secondClassLower: Number(secondClassLower),
                  })
                }
              />
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Subtitle style={{ flex: 1 }}>Third Class</Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.thirdClass)}
                onChangeText={(thirdClass) =>
                  this.changeGradingSystem({ thirdClass: Number(thirdClass) })
                }
              />
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Subtitle style={{ flex: 1 }}>Pass</Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.pass)}
                onChangeText={(pass) =>
                  this.changeGradingSystem({ pass: Number(pass) })
                }
              />
            </View>
          </View>
        </Row>
        <Divider styleName="section-header">
          <Caption>THE PERCENTAGE OF YOUR CGPA THAT EACH YEAR CARRIES</Caption>
          {/* <Caption>Percentage (%)</Caption> */}
        </Divider>
        <Row>
          <View
            style={{
              flex: 1,
            }}
          >
            {Array.from(new Array(field.numOfYears), (v, year) => (
              <View style={{ flexDirection: 'row', flex: 1 }} key={year++}>
                <Subtitle style={{ flex: 1 }}>Year {year}</Subtitle>
                <TextInput
                  style={styles.underline}
                  onChangeText={(weight) =>
                    this.changeYearWeight({ year, weight })
                  }
                  value={String((field.levelWeight[year] || 0) * 100)}
                />
                <Caption>% </Caption>
              </View>
            ))}
          </View>
        </Row>
        <Divider styleName="section-header" />
      </View>
    )
  }
}

const AdvancedSettings = connect(mapStateToProps)(AdvanceSettingsX)

export class AdvancedSettingsScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Advanced Settings',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon
        name="ios-hammer-outline"
        size={focused ? 25 : 23}
        color={tintColor}
      />
    ),
  }

  render() {
    return (
      <Screen>
        <Toolbar title="Advanced Settings" showNavIcon />
        <ScrollView>
          <AdvancedSettings />
        </ScrollView>
      </Screen>
    )
  }
}

const styles = {
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' },
}

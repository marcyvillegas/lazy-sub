import GreenScreen from './components/GreenScreen'
import FormLayout from './layouts/FormLayout'
import './animation.css'
import NavigationLayout from '@/layouts/NavigationLayout/NavigationLayout'

export default function Animation() {
  return (
    <NavigationLayout>
      <div className="grid grid-cols-12">
        <GreenScreen />
        <FormLayout />
      </div>
    </NavigationLayout>
  )
}

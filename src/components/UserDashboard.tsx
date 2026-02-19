import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'
import GroceryItemCard from './GroceryItemCard'
import connectDb from '@/lib/db'
import GroceryModel from '@/models/grocery.model'

const UserDashboard = async() => {
  await connectDb()
  const groceriesRaw = await GroceryModel.find({}).lean()

  const groceries = groceriesRaw.map((item) => ({
    ...item,
    _id: item._id.toString(),   // convert ObjectId → string
    createdAt: item.createdAt?.toString(),
    updatedAt: item.updatedAt?.toString(),
  }))

  return (
    <>
      <HeroSection/>
      <CategorySlider/>
  <div className="flex gap-6 overflow-x-auto md:px-8 pb-8 md:mx-12 mx-2">
    {groceries.map((item) => (
      <GroceryItemCard key={item._id} item={item} />
    ))}
  </div>
    </>
  )
}

export default UserDashboard
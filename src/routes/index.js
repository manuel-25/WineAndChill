import { Router } from "express"
import api_router from './api/indexApi.js'
import views_router from './views/indexViews.js'

const router = Router()

router.use('/api', api_router)
router.use('/', views_router)


export default router

//Enrutador principal de la aplicacion
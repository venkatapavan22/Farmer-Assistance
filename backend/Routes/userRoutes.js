import express from 'express'
import { deleteUser, getUser, getUsers, updateUser,  upload,  userLogin, userRegister } from '../Controllers/userController.js'


const router= express.Router()
router.post('/signup',userRegister)
router.post('/login',userLogin)
router.get('/getUser/:id',getUser)
router.get('/getUsers',getUsers)
router.put('/updateUser/:id',upload.single('image'),updateUser)
router.delete('/deleteUser/:id',deleteUser)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})
export default router
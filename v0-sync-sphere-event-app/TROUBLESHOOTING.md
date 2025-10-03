# 🔧 Authentication Troubleshooting Guide

## 🚨 **Common Issues & Solutions**

### **1. "Cannot find module" Errors**

**Problem:** TypeScript errors about missing modules
```
Cannot find module '@/components/AuthInitializer'
```

**Solution:** 
- Restart your development server: `npm run dev`
- Clear Next.js cache: `rm -rf .next` (or delete `.next` folder)
- Restart TypeScript server in VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

### **2. Supabase Connection Issues**

**Problem:** "Connection Error" or auth not working

**Solution:** Check your `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ncxgqzjqumhvvimmmknm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- ✅ File must be named exactly `.env.local`
- ✅ Must be in the project root directory
- ✅ No spaces around the `=` sign
- ✅ Restart dev server after creating/editing

---

### **3. Sign Up Not Working**

**Problem:** Users not appearing in Supabase dashboard

**Possible Causes:**
1. **Email confirmation required** - Check Supabase Auth settings
2. **Invalid email format** - Use a real email address
3. **Password too short** - Must be at least 6 characters
4. **Rate limiting** - Wait a few minutes between attempts

**Solution:**
1. Go to Supabase Dashboard → Authentication → Settings
2. Turn OFF "Enable email confirmations" for testing
3. Use a valid email format (test@example.com)
4. Use a strong password (6+ characters)

---

### **4. Redirect Issues**

**Problem:** Not redirecting to dashboard after login

**Solution:**
- Check browser console for JavaScript errors
- Verify the dashboard route exists: `/dashboard/page.tsx`
- Clear browser cache and cookies
- Try in incognito/private browsing mode

---

### **5. Toast Notifications Not Showing**

**Problem:** No success/error messages appearing

**Solution:**
- Check that `<Toaster />` is in your layout.tsx
- Verify react-hot-toast is installed: `npm list react-hot-toast`
- Check browser console for errors

---

### **6. Navbar Not Showing User Info**

**Problem:** User name not appearing in navigation

**Solution:**
- Check that AuthInitializer is running in layout.tsx
- Verify user data in browser console: `console.log(user)`
- Check if user metadata is being saved during signup

---

### **7. Protected Routes Not Working**

**Problem:** Can access dashboard without being logged in

**Solution:**
- Verify ProtectedRoute wrapper is around protected components
- Check that auth store is initialized
- Clear browser storage: `localStorage.clear()`

---

### **8. Styling Issues**

**Problem:** Components look broken or unstyled

**Solution:**
- Verify Tailwind CSS is working: add `className="bg-red-500"` to test
- Check that all UI components are properly imported
- Restart development server

---

## 🧪 **Quick Debug Commands**

### **Check Auth State in Browser Console:**
```javascript
// Check if user is logged in
console.log('User:', window.localStorage.getItem('sb-ncxgqzjqumhvvimmmknm-auth-token'))

// Check Supabase client
console.log('Supabase:', window.supabase)
```

### **Test Supabase Connection:**
```javascript
// In browser console
supabase.auth.getSession().then(console.log)
```

### **Clear All Auth Data:**
```javascript
// In browser console - clears all stored auth data
localStorage.clear()
sessionStorage.clear()
location.reload()
```

---

## 📋 **Verification Checklist**

Before reporting issues, verify:

- [ ] `.env.local` file exists with correct Supabase credentials
- [ ] Development server is running (`npm run dev`)
- [ ] No TypeScript errors in terminal
- [ ] Browser console shows no JavaScript errors
- [ ] Supabase project is active and accessible
- [ ] Internet connection is working
- [ ] Using a modern browser (Chrome, Firefox, Safari, Edge)

---

## 🆘 **Still Having Issues?**

1. **Check the browser Network tab** - Look for failed API requests
2. **Check Supabase logs** - Go to your Supabase dashboard → Logs
3. **Try a different browser** - Rule out browser-specific issues
4. **Check Supabase status** - Visit status.supabase.com
5. **Restart everything** - Close all terminals, restart VS Code, restart browser

---

## 🎯 **Quick Test Script**

Run this in your browser console to test the auth system:

```javascript
// Test auth store
const testAuth = async () => {
  console.log('Testing auth system...')
  
  // Check if store exists
  if (typeof useAuthStore === 'undefined') {
    console.error('❌ Auth store not found')
    return
  }
  
  // Check Supabase connection
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('❌ Supabase error:', error)
    } else {
      console.log('✅ Supabase connected:', data)
    }
  } catch (e) {
    console.error('❌ Supabase not available:', e)
  }
  
  console.log('Test complete!')
}

testAuth()
```

Your authentication system should now be working perfectly! 🚀

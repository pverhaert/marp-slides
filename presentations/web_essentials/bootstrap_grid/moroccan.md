---
marp: true
theme: thomasmore
paginate: true
header: 'ITF | Web Essentials - Bootstrap 5.3.8 Grid'
footer: 'Web Essentials - Thomas More Hogeschool'
---

<!-- _class: lead -->
<!-- _paginate: false -->

# نظام الشبكة Bootstrap 5.3.8 Grid

<p class="subtitle">&lt;بناء تصاميم متجاوبة بـ 12 عمود /&gt;</p>

<div class="meta-box">
  <strong>Thomas More Hogeschool</strong> - الإعلاميات التطبيقية (ITF)<br>
  <strong>المادة:</strong> Web Essentials | <strong>المجزوءة:</strong> Bootstrap Layout
</div>

---

## الفهرس

1. **شنو هو Bootstrap 5.3.8؟** - مقدمة وتهيئة تركيبية
2. **علاش خاصنا Reboot؟** - توحيد الـ CSS و box-sizing
3. **الفرق بين .css و .min.css** - بيئة التطوير ضد بيئة الإنتاج
4. **الركائز الثلاث الأساسية** - Container، Row، والأعمدة
5. **نقاط التوقف (Breakpoints)** - حدود العرض المتجاوبة
6. **الحاويات (Containers)** - أنواع الحاويات ومقاساتها
7. **نموذج 12 عمود** - كيفاش تقسم الصفحة
8. **كلاسات التجاوب** - `col-sm-`، `col-md-`، `col-lg-`
9. **التوزيع التلقائي (Auto-layout)** - حساب العرض أوتوماتيكياً
10. **الفرق بين .col و .col-auto** - اقتسام المساحة ضد حجم المحتوى
11. **تداخل الأعمدة (Nesting)** - شبكات داخلية وسط الأعمدة
12. **الفواصل (Gutters)** - المسافات بين الأعمدة
13. **الإزاحة والترتيب (Offset & Order)** - التموضع وتغيير الترتيب
14. **مثال تطبيقي وأخطاء شائعة** - تصميم Portfolio وأحسن الممارسات

---

## شنو هو Bootstrap 5.3.8؟

بوتستراب هو **إطار عمل CSS مفتوح المصدر** مشهور بزاف لبناء صفحات ويب متجاوبة بتوجه الهواتف أولاً (Mobile-first).

<div class="grid-2">
<div class="card card-accent">

#### علاش Bootstrap في Web Essentials؟

- ما كتحتاجش تبني grid معقد أو تكتب media queries من الصفر
- **متجاوب تماماً** وموثوق على أي قياس شاشة
- معيار معتمد في المجال لتنظيم وهيكلة التصاميم بسرعة
- **الدورة 1 (Semester 1):** كنركزو **فقط** على الـ layout وشبكة 12 عمود
- **الدورة 2 (Semester 2):** مكونات الواجهة (modals, navbar, alerts, buttons) غادي يجيو من بعد

</div>
<div class="card card-cyan">

#### تثبيت مجزأ عبر الـ CDN (v5.3.8)

حمّل **فقط** ملفات reboot و grid في الـ `<head>` ديالك:

```html
<!-- 1. إعادة الضبط وتوحيد الأساس -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap-reboot.min.css">

<!-- 2. نظام الشبكة بـ 12 عمود flexbox -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap-grid.min.css">
```

> **مهم بزاف:** في الدورة الأولى، **ما تيليشارجيش** ملف `bootstrap.min.css` كامل. الملفات المجزأة كتخلي الكود خفيف ونظيف بيداغوجياً!

</div>
</div>

---

## علاش نزيدو `bootstrap-reboot`؟

كل متصفح (Chrome, Firefox, Safari, Edge) عندو قياسات وهوامش افتراضية خاصة به. ملف **Reboot** كيوحّد خط البداية للجميع.

<div class="grid-2">
<div class="card card-accent">

#### شنو هو Reboot وشنو كيدير؟

- **CSS reset متطور** مبني فوق Normalize.css
- كيمسح الاختلافات العشوائية بين المتصفحات (*user-agent styles*)
- كيعطي قاعدة مستقرة ومضمونة لنظام الـ grid
- **توحيد الخطوط:** `line-height: 1.5` مع خطوط النظام الحديثة
- **إعادة ضبط العناصر:** توحيد الجداول (`border-collapse`)، الاستمارات، والروابط

</div>
<div class="card card-cyan">

#### نقطة حاسمة للـ Grid

- **`box-sizing: border-box`** على جميع العناصر:
  - الـ padding والـ border كيتحسبو **داخل** العرض المحدد للعنصر
  - ضروري باش الأعمدة ما تفيضش وما تهبطش للسطر الموالي!
- **هوامش منسجمة:**
  - `margin-top: 0` على `h1`-`h6` والفقرات كيمنع تداخل الهوامش غير المتوقع (*margin-collapsing*)
  - `margin-bottom` مدروس ومبني بوحدات `rem`

</div>
</div>

---

## الفرق: `xxx.css` ضد `xxx.min.css`

بوتستراب كيوفر جوج نسخ من كل ملف ستايل. بجوجهم فيهم **نفس قواعد CSS تماماً**، ولكن كيختلفو في التنسيق وحجم الملف:

<div class="grid-2">
<div class="card">

#### `xxx.css` (نسخة التطوير)

- **منسق ومقروء للبشر:** فيه مسافات، tabs، أسطر جديدة، وتعليقات
- **الهدف:** قراءة وفهم كيفاش تبناو القواعد وتصحيح الأخطاء محلياً
- **العيب:** حجم الملف كبير بزاف وكيتقل التحميل عبر الشبكة

```css
/* مثال في bootstrap-grid.css */
.row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}
```

</div>
<div class="card card-accent">

#### `xxx.min.css` (نسخة الإنتاج)

- **مضغوط (Minified):** جميع الفراغات والأسطر والتعليقات ممسوحة
- **الهدف:** المواقع الحية وبيئة الإنتاج (بحال الـ CDN)
- **الميزة:** حجم الملف **صغير بنسبة 60% حتى 80%**

```css
/* نفس الكود في bootstrap-grid.min.css */
.row-cols-auto>*{flex:0 0 auto;width:auto;}
```

> **خلاصة:** ديما استعمل نسخة `.min.css` في مشاريعك الحقيقية باش تضمن سرعة التحميل وأفضل أداء!

</div>
</div>

---

## الركائز الثلاث الأساسية

نظام شبكة Bootstrap كيعتمد على **ثلاثة عناصر متداخلة** بهاد الترتيب الصارم:

<div class="card card-glass">

#### الترتيب الهرمي للـ Grid

- **`.container`** - كيعطي هوامش جانبية وكيوسط المحتوى أفقياً في الصفحة
- **`.row`** - الحاضن للأعمدة، كيطبق هوامش سالبة باش يلغي فراغات الأعمدة
- **`.col` أو `.col-*`** - الأعمدة الحقيقية اللي كتحط فيها المحتوى (ولاد مباشرين لـ `.row`)

</div>

```html
<div class="container">
  <div class="row">
    <div class="col">العمود 1</div>
    <div class="col">العمود 2</div>
    <div class="col">العمود 3</div>
  </div>
</div>
```

> **القاعدة الذهبية:** ما تحطش `.col` مباشرة داخل `.container` نهائياً. الأعمدة خاصها ديما تكون عناصر فرعية مباشرة لـ `.row`!

---

## نقاط التوقف (Breakpoints)

بوتستراب 5.3.8 كيوفر **6 نقاط توقف** مبنية على العرض الأدنى للشاشة:

<div class="grid-2">
<div>

| الاسم | البادئة | العرض الأدنى | الأجهزة المعتادة |
| :--- | :---: | :---: | :--- |
| Extra small | *(بدون)* | < 576px | هواتف صغيرة (عمودي) |
| **Small** | `sm` | 576px | هواتف (أفقي) |
| **Medium** | `md` | 768px | لوحات إلكترونية (Tablets) |
| **Large** | `lg` | 992px | حواسيب محمولة / شاشات عادية |
| **Extra large** | `xl` | 1200px | شاشات مكتبية كبيرة |
| **XXL** | `xxl` | 1400px | شاشات عريضة جداً |

</div>
<div>

> **تفضيل الهواتف (Mobile-first):**
>
> - ستايلات بوتستراب كطبق من الشاشات الصغيرة وتطلع للشاشات الكبيرة.
> - كلاس بدون بادئة كيطبق على جميع الشاشات.
> - كلاس ببادئة كيطبق ابتداءً من ديك النقطة **والشاشات الأكبر منها**.

</div>
</div>

---

## الحاويات (Containers)

الحاوية هي الغلاف الخارجي لأي تخطيط:

<div class="grid-3">
<div class="card card-accent">

#### `.container`

عرض أقصى ثابت لكل نقطة توقف. كيجي موسط أوتوماتيكياً بهوامش جانبية.

```html
<div class="container">
  ...
</div>
```

</div>
<div class="card card-cyan">

#### `.container-fluid`

عريض ديما بنسبة 100% على طول عرض الشاشة المتاحة.

```html
<div class="container-fluid">
  ...
</div>
```

</div>
<div class="card">

#### `.container-{bp}`

كيكون عريض بنسبة 100% حتى كيوصل لنقطة التوقف المحددة، عاد كياخد عرض ثابت.

```html
<div class="container-md">
  ...
</div>
```

</div>
</div>

---

## نموذج 12 عمود (12-Column Model)

أي سطر (`.row`) في بوتستراب كيتقسم لـ **12 وحدة عمود متساوية**. نتا كتحدد شحال من وحدة كياخد كل عنصر:

<div class="card card-glass">

#### توزيع 12 وحدة

- `col-12` = 12/12 = عرض **100%** (سطر كامل)
- `col-6` + `col-6` = 6/12 + 6/12 = جوج أعمدة بنسبة **50%** لكل واحد
- `col-4` + `col-4` + `col-4` = ثلاثة أعمدة بنسبة **33.3%** لكل واحد
- `col-8` + `col-4` = محتوى رئيسي **66.7%** + شريط جانبي **33.3%**

</div>

> **قاعدة الحساب:** مجموع أرقام الأعمدة داخل نفس الـ `.row` خاصو يوصل لـ **12**. إلا فات 12، الأعمدة الزائدة كتهبط تلقائياً لسطر جديد.

---

## البنية الأساسية للـ Grid

<div class="grid-2">
<div>

```html
<div class="container">
  <div class="row">

    <!-- 4 من 12 = 33% عرض -->
    <div class="col-4">شريط جانبي</div>

    <!-- 8 من 12 = 67% عرض -->
    <div class="col-8">محتوى رئيسي</div>

  </div>
  <div class="row">

    <!-- 3 أعمدة متساوية: 4+4+4 -->
    <div class="col-4">بطاقة 1</div>
    <div class="col-4">بطاقة 2</div>
    <div class="col-4">بطاقة 3</div>

  </div>
</div>
```

</div>
<div class="card" style="padding: 16px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<div style="border: 2px dashed rgba(232, 78, 16, 0.4); border-radius: 8px; padding: 12px; background: rgba(15, 20, 28, 0.6);">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
<span class="badge" style="font-size: 0.72rem; padding: 2px 8px;">.container</span>
<span style="font-size: 0.72rem; color: #8b949e;">موسط مع مسافات جانبية</span>
</div>
<!-- Row 1: 4 + 8 -->
<div style="border: 1px solid rgba(0, 156, 171, 0.3); border-radius: 6px; padding: 8px; margin-bottom: 10px; background: rgba(24, 31, 42, 0.5);">
<div style="font-size: 0.7rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">.row &nbsp;<span style="color: #8b949e;">(المجموع: 12 عمود)</span></div>
<div style="display: flex; gap: 8px;">
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 6px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.72rem; color: var(--color-foreground); margin-top: 2px;">جانبي (33%)</div>
</div>
<div style="flex: 8; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 12px 6px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.8rem;">.col-8</div>
<div style="font-size: 0.72rem; color: var(--color-foreground); margin-top: 2px;">رئيسي (67%)</div>
</div>
</div>
</div>
<!-- Row 2: 4 + 4 + 4 -->
<div style="border: 1px solid rgba(0, 156, 171, 0.3); border-radius: 6px; padding: 8px; background: rgba(24, 31, 42, 0.5);">
<div style="font-size: 0.7rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">.row &nbsp;<span style="color: #8b949e;">(4 + 4 + 4 = 12)</span></div>
<div style="display: flex; gap: 8px;">
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">بطاقة 1</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">بطاقة 2</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.8rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 2px;">بطاقة 3</div>
</div>
</div>
</div>
</div>

</div>
</div>

---

## الكلاسات المتجاوبة (Responsive Classes)

جمع كلاسات مختلفة من نقاط التوقف باش تحدد **تخطيطات متغيرة حسب قياس الشاشة**:

```html
<!-- هاتف: عرض 100% | لوحة إلكترونية: 50% | حاسوب محمول: 33.3% -->
<div class="col-12 col-md-6 col-lg-4">
  بطاقة المشروع
</div>
```

<div class="grid-3">
<div class="card card-accent">

#### هاتف (`< 768px`)

`col-12`

- كياخد عرض **100%**
- البطاقات كيجيو وحدة فوق وحدة

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(232, 78, 16, 0.4); display: flex; flex-direction: column; gap: 4px;">
  <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 3px; padding: 4px; text-align: center; font-size: 0.68rem; font-weight: 700; color: var(--color-accent-light);">بطاقة 1 (100%)</div>
  <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 3px; padding: 4px; text-align: center; font-size: 0.68rem; font-weight: 700; color: var(--color-accent-light);">بطاقة 2 (100%)</div>
</div>

</div>
<div class="card card-cyan">

#### تابلت (`>= 768px`)

`col-md-6`

- كياخد عرض **50%**
- 2 بطاقات جنب لجنب في السطر

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(0, 156, 171, 0.4); display: flex; gap: 4px;">
  <div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.66rem; font-weight: 700; color: var(--color-secondary);">ب 1 (50%)</div>
  <div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.66rem; font-weight: 700; color: var(--color-secondary);">ب 2 (50%)</div>
</div>

</div>
<div class="card">

#### حاسوب (`>= 992px`)

`col-lg-4`

- كياخد عرض **33.3%**
- 3 بطاقات جنب لجنب في السطر

<div style="margin-top: 10px; padding: 6px; background: rgba(15, 20, 28, 0.7); border-radius: 4px; border: 1px dashed rgba(230, 237, 243, 0.25); display: flex; gap: 4px;">
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">ب 1 (33%)</div>
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">ب 2 (33%)</div>
  <div style="flex: 1; background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border); border-radius: 3px; padding: 10px 2px; text-align: center; font-size: 0.62rem; font-weight: 700; color: var(--color-foreground);">ب 3 (33%)</div>
</div>

</div>
</div>

---

## التوزيع التلقائي للأعمدة (Auto-layout)

استعمل `col` **بلا حتى رقم** باش تقسم الأعمدة بالتساوي على المساحة اللي كاينة:

<div class="grid-2">
<div class="card card-accent">

#### اقتسام متساوي

```html
<div class="row">
  <div class="col">العمود 1</div>
  <div class="col">العمود 2</div>
  <div class="col">العمود 3</div>
</div>
```

كل `.col` كياخد أوتوماتيكياً **ثلث المساحة (1/3)** بالضبط.

<div style="display: flex; gap: 6px; margin-top: 8px;">
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
  <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">33.3%</div>
  </div>
</div>

</div>
<div class="card card-cyan">

#### عرض محدد + تلقائي

```html
<div class="row">
  <div class="col">تلقائي</div>
  <div class="col-6">ثابت 50%</div>
  <div class="col">تلقائي</div>
</div>
```

العنصران ديال `.col` كيقتسمو الـ 50% اللي بقات بالتساوي (25% لكل واحد).

<div style="display: flex; gap: 6px; margin-top: 8px;">
  <div style="flex: 1; background: rgba(0, 156, 171, 0.15); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">25%</div>
  </div>
  <div style="flex: 2; background: rgba(232, 78, 16, 0.25); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.72rem;">.col-6</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">50%</div>
  </div>
  <div style="flex: 1; background: rgba(0, 156, 171, 0.15); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px 2px; text-align: center;">
    <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.72rem;">.col</div>
    <div style="font-size: 0.65rem; color: var(--color-foreground);">25%</div>
  </div>
</div>

</div>
</div>

> الكلاس `col-auto` كيحدد عرض العمود على حساب **المحتوى الطبيعي ديالو** (`fit-content`). شوف السلايد الجاي للمقارنة المباشرة!

---

## الفرق: `.col` ضد `.col-auto`

كيفاش كيحسبو هاد الأعمدة التلقائية العرض ديالهم داخل `.row`؟

<div class="grid-2">
<div>

<div class="card card-accent" style="margin-bottom: 12px; padding: 12px;">

#### `.col` &rarr; كيقتسم المساحة

- كيعمر كاع **المساحة المتبقية** المتاحة (`flex-grow: 1`)
- إلا كانو بزاف ديال عناصر `.col`، كيقتسمو الفراغ **بالتساوي** وخا يكون المحتوى مختلف في الطول

</div>

<div class="card card-cyan" style="padding: 12px;">

#### `.col-auto` &rarr; كيتبع المحتوى

- كيتمدد أو كيتقلص على حساب **المحتوى ديالو بالضبط** (`fit-content`, `flex: 0 0 auto`)
- ممتاز للعناصر الصغيرة بحال الشارات (badges)، الأزرار، الأيقونات، أو الصور المصغرة

</div>

</div>
<div class="card" style="padding: 14px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<!-- Example 1: .col -->
<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-accent-light); margin-bottom: 6px; font-family: var(--font-code);">باستعمال .col (توزيع متساوي):</div>
  <div style="display: flex; gap: 6px;">
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col</div>
      <div style="font-size: 0.65rem; color: var(--color-foreground);">نص قصير (50%)</div>
    </div>
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col</div>
      <div style="font-size: 0.65rem; color: var(--color-foreground);">نص طويل شوية (50%)</div>
    </div>
  </div>
</div>

<!-- Example 2: .col-auto paired with .col -->
<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">تطبيق عملي: .col-auto + .col + .col-auto:</div>
  <div style="display: flex; gap: 6px; align-items: center;">
    <div style="flex: 0 0 auto; background: rgba(0, 156, 171, 0.25); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 8px 10px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.74rem;">.col-auto</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">[ شارة ]</div>
    </div>
    <div style="flex: 1; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 8px 4px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.74rem;">.col (مرن)</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">عنوان المقال...</div>
    </div>
    <div style="flex: 0 0 auto; background: rgba(0, 156, 171, 0.25); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 8px 10px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.74rem;">.col-auto</div>
      <div style="font-size: 0.62rem; color: var(--color-foreground);">&lt;زر&gt;</div>
    </div>
  </div>
</div>

<div style="font-size: 0.68rem; color: #8b949e; line-height: 1.3;">
  <strong>التركيبة المثالية:</strong> استعمل <code>.col-auto</code> للعناصر ذات العرض المحدد و <code>.col</code> باش يعمر الفراغ المتبقي بمرونة.
</div>

</div>
</div>

---

## تداخل الأعمدة (Nesting)

تقدر تبدا **شبكة فرعية جديدة وسط عمود** بوضع `.row` آخر داخله:

<div class="grid-2">
<div>

```html
<div class="container">
  <div class="row">

    <!-- العمود الرئيسي: 8 من 12 -->
    <div class="col-8">
      <h2>القسم الرئيسي</h2>

      <!-- سطر داخلي: 12 وحدة جديدة! -->
      <div class="row">
        <div class="col-6">يسار (50%)</div>
        <div class="col-6">يمين (50%)</div>
      </div>
    </div>

    <!-- شريط جانبي: 4 من 12 -->
    <div class="col-4">جانبي</div>

  </div>
</div>
```

</div>
<div class="card" style="padding: 14px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 2px dashed rgba(0, 156, 171, 0.4); border-radius: 8px; padding: 10px; background: rgba(15, 20, 28, 0.6);">
<div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 8px; font-family: var(--font-code);">الـ .row الخارجي &nbsp;<span style="color: #8b949e;">(المجموع 12 عمود)</span></div>
<div style="display: flex; gap: 8px;">
<!-- Main column col-8 -->
<div style="flex: 8; background: rgba(24, 31, 42, 0.9); border: 2px solid var(--color-accent); border-radius: 6px; padding: 8px;">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
<span style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-8 (القسم الرئيسي)</span>
<span style="font-size: 0.65rem; color: #8b949e;">67% من السطر الخارجي</span>
</div>
<!-- Inner row -->
<div style="border: 1px dashed rgba(0, 156, 171, 0.6); border-radius: 4px; padding: 6px; background: rgba(15, 20, 28, 0.7);">
<div style="font-size: 0.68rem; color: var(--color-secondary); margin-bottom: 4px; font-family: var(--font-code);">الـ .row الداخلي &nbsp;<span style="color: #8b949e;">(12 وحدة جديدة تماماً!)</span></div>
<div style="display: flex; gap: 6px;">
<div style="flex: 1; background: linear-gradient(135deg, rgba(0, 156, 171, 0.3), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.75rem;">.col-6</div>
<div style="font-size: 0.66rem; color: var(--color-foreground);">50% من col-8</div>
</div>
<div style="flex: 1; background: linear-gradient(135deg, rgba(0, 156, 171, 0.3), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 3px; padding: 10px 4px; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.75rem;">.col-6</div>
<div style="font-size: 0.66rem; color: var(--color-foreground);">50% من col-8</div>
</div>
</div>
</div>
</div>
<!-- Sidebar col-4 -->
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.2), rgba(232, 78, 16, 0.05)); border: 1px solid var(--color-accent); border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
<div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-4</div>
<div style="font-size: 0.7rem; color: var(--color-foreground); margin-top: 4px;">شريط جانبي</div>
<div style="font-size: 0.65rem; color: #8b949e; margin-top: 2px;">33% من السطر الخارجي</div>
</div>
</div>
</div>
</div>

<div style="font-size: 0.7rem; color: #8b949e; margin-top: 4px; line-height: 1.4;">
<strong>الفكرة الأساسية:</strong> السطر المتداخل <code>.row</code> كيعاود يبدا 12 عمود جديدة وسط العنصر الأب ديالو (<code>.col-8</code>).
</div>

</div>
</div>

---

## الفواصل (Gutters) - المسافات بين الأعمدة

الفواصل (Gutters) كتحكم في **الـ padding** الأفقي والعمودي بين الأعمدة:

<div class="grid-2">
<div>

| الكلاس | الاستعمال والتطبيق |
| :--- | :--- |
| `g-0` حتى `g-5` | فواصل أفقية وعمودية معاً |
| `gx-0` حتى `gx-5` | فواصل أفقية فقط (محور X) |
| `gy-0` حتى `gy-5` | فواصل عمودية فقط (محور Y) |

```html
<!-- gx-4: فراغ أفقي واسع | gy-2: فراغ عمودي خفيف -->
<div class="row gx-4 gy-2">
  <div class="col-6">بطاقة أ</div>
  <div class="col-6">بطاقة ب</div>
  <div class="col-6">بطاقة ج</div>
  <div class="col-6">بطاقة د</div>
</div>
```

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; justify-content: center; gap: 8px;">

<div style="border: 1px solid var(--color-border); border-radius: 8px; padding: 12px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 8px; font-family: var(--font-code);">توضيح بصري: .row.gx-4.gy-2</div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 22px; row-gap: 8px;">
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">بطاقة أ</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">بطاقة ب</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">بطاقة ج</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 4px; text-align: center;">
      <span style="font-weight: 700; color: var(--color-accent-light); font-size: 0.75rem;">بطاقة د</span>
    </div>
  </div>

  <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.66rem;">
    <span style="color: var(--color-secondary); font-family: var(--font-code);">&harr; gx-4 (فراغ الأعمدة الأفقي)</span>
    <span style="color: var(--color-accent-light); font-family: var(--font-code);">&varr; gy-2 (فراغ الأسطر العمودي)</span>
  </div>
</div>

<div style="font-size: 0.68rem; color: #8b949e; line-height: 1.3;">
  الكلاس <code>g-0</code> كيمسح المسافات كاملة (ممتاز لمعارض الصور المتلاصقة edge-to-edge).
</div>

</div>
</div>

---

## الإزاحة (Offset) - ديبلاصي الأعمدة

استعمل `offset-{bp}-{n}` باش تدفع الأعمدة لليمين باستعمال مسارات فارغة:

<div class="grid-2">
<div>

```html
<div class="row">
  <!-- موسط: 4 خاويين + 4 عمود + 4 خاويين = 12 -->
  <div class="col-4 offset-4">
    صندوق في الوسط
  </div>
</div>

<div class="row">
  <div class="col-md-4">مربع يسار</div>
  <!-- كينقز 4 أعمدة -->
  <div class="col-md-4 offset-md-4">مربع يمين</div>
</div>
```

> مثالي لصفحات تسجيل الدخول في الوسط، النوافذ المنبثقة، أو تصاميم المعارض المتدرجة.

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 10px; justify-content: center;">

<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">السطر 1: col-4 offset-4 &nbsp;<span style="color: #8b949e;">(4 + 4 + 4 = 12)</span></div>
  <div style="display: flex; gap: 4px;">
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">offset-4</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 خاويين</div>
    </div>
    <div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.25), rgba(232, 78, 16, 0.1)); border: 1px solid var(--color-accent); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-accent-light); font-size: 0.76rem;">.col-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">موسط</div>
    </div>
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">(الباقي: 4)</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 خاويين</div>
    </div>
  </div>
</div>

<div style="border: 1px solid var(--color-border); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="font-size: 0.72rem; color: var(--color-secondary); margin-bottom: 6px; font-family: var(--font-code);">السطر 2: col-md-4 + offset-md-4</div>
  <div style="display: flex; gap: 4px;">
    <div style="flex: 4; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.76rem;">.col-md-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">يسار</div>
    </div>
    <div style="flex: 4; border: 1px dashed #484f58; border-radius: 4px; padding: 10px 2px; text-align: center; background: rgba(255,255,255,0.02);">
      <div style="font-size: 0.68rem; color: #8b949e; font-family: var(--font-code);">offset-md-4</div>
      <div style="font-size: 0.62rem; color: #6e7681;">4 منقزين</div>
    </div>
    <div style="flex: 4; background: linear-gradient(135deg, rgba(0, 156, 171, 0.25), rgba(0, 156, 171, 0.1)); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
      <div style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.76rem;">.col-md-4</div>
      <div style="font-size: 0.66rem; color: var(--color-foreground);">يمين</div>
    </div>
  </div>
</div>

</div>
</div>

---

## الترتيب البصري (Order)

استعمل `order-{bp}-{n}` باش تبدل **الترتيب البصري ديال العرض** بلا ما تقيس كود الـ HTML:

<div class="grid-2">
<div>

```html
<div class="row">
  <!-- هاتف: تحت | حاسوب: يسار -->
  <div class="col-12 col-md-8 order-2 order-md-1">
    <h2>معلومات عليا</h2>
    <p>النص كيظهر على ليسر ديال الصورة.</p>
  </div>

  <!-- هاتف: الفوق | حاسوب: يمين -->
  <div class="col-12 col-md-4 order-1 order-md-2">
    <img src="photo.webp" alt="الصورة الشخصية">
  </div>
</div>
```

> حل ممتاز لـ **Mobile-first**: في التيليفون كتبان الصورة هي الأولى والنص لتحت، وفي الحاسوب كيرجع النص هو الأول على اليسار.

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 1px solid rgba(232, 78, 16, 0.4); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
    <span class="badge" style="font-size: 0.68rem; padding: 1px 6px;">هاتف (&lt; 768px)</span>
    <span style="font-size: 0.65rem; color: #8b949e;">واحد فوق واحد</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <div style="background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 6px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-secondary);">order-1: الصورة (الفوق)</span>
    </div>
    <div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 6px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-accent-light);">order-2: النص 'معلومات عليا' (لتحت)</span>
    </div>
  </div>
</div>

<div style="border: 1px solid rgba(0, 156, 171, 0.4); border-radius: 6px; padding: 8px; background: rgba(15, 20, 28, 0.6);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
    <span class="badge badge-cyan" style="font-size: 0.68rem; padding: 1px 6px;">حاسوب (&gt;= 768px)</span>
    <span style="font-size: 0.65rem; color: #8b949e;">جنب لجنب</span>
  </div>
  <div style="display: flex; gap: 6px;">
    <div style="flex: 8; background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 12px 4px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-accent-light);">order-md-1: النص (8 أعمدة)</span>
    </div>
    <div style="flex: 4; background: rgba(0, 156, 171, 0.2); border: 1px solid var(--color-secondary); border-radius: 4px; padding: 12px 4px; text-align: center;">
      <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-secondary);">order-md-2: الصورة (4 أعمدة)</span>
    </div>
  </div>
</div>

</div>
</div>

---

## مثال تطبيقي: تصميم Portfolio

<div class="grid-2">
<div>

```html
<div class="container">
  <!-- شريط التصفح: 100% -->
  <div class="row">
    <div class="col-12"><nav>Portfolio</nav></div>
  </div>

  <!-- القسم الرئيسي + الشريط الجانبي -->
  <div class="row gy-4">
    <div class="col-12 col-lg-8">
      <h2>المشاريع</h2>
      <div class="row g-3">
        <div class="col-12 col-md-6 col-xl-4">P1</div>
        <div class="col-12 col-md-6 col-xl-4">P2</div>
        <div class="col-12 col-md-6 col-xl-4">P3</div>
      </div>
    </div>

    <div class="col-12 col-lg-4">
      <aside>معلومات والاتصال</aside>
    </div>
  </div>
</div>
```

</div>
<div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px; justify-content: center;">

<div style="border: 2px dashed rgba(232, 78, 16, 0.4); border-radius: 8px; padding: 10px; background: rgba(15, 20, 28, 0.6);">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
<span class="badge" style="font-size: 0.68rem; padding: 1px 6px;">.container</span>
<span style="font-size: 0.65rem; color: #8b949e;">معاينة المخطط الهيكلي (Desktop)</span>
</div>
<!-- Navigation -->
<div style="background: rgba(232, 78, 16, 0.2); border: 1px solid var(--color-accent); border-radius: 4px; padding: 5px 8px; margin-bottom: 8px; font-size: 0.72rem; font-weight: 700; color: var(--color-accent-light); font-family: var(--font-code);">
.col-12: &lt;nav&gt; Portfolio
</div>
<!-- Body row -->
<div style="display: flex; gap: 8px;">
<!-- Projects col-lg-8 -->
<div style="flex: 8; background: rgba(24, 31, 42, 0.8); border: 1px solid var(--color-secondary); border-radius: 6px; padding: 8px;">
<div style="font-size: 0.72rem; font-weight: 700; color: var(--color-secondary); font-family: var(--font-code); margin-bottom: 6px;">
.col-12.col-lg-8 (المشاريع)
</div>
<!-- Nested project cards -->
<div style="display: flex; gap: 6px;">
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P1</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P2</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
<div style="flex: 1; background: rgba(0, 156, 171, 0.2); border: 1px dashed var(--color-secondary); border-radius: 4px; padding: 10px 2px; text-align: center;">
<div style="font-size: 0.68rem; font-weight: 700; color: var(--color-secondary);">P3</div>
<div style="font-size: 0.6rem; color: #8b949e;">col-xl-4</div>
</div>
</div>
</div>
<!-- Aside col-lg-4 -->
<div style="flex: 4; background: linear-gradient(135deg, rgba(232, 78, 16, 0.2), rgba(232, 78, 16, 0.05)); border: 1px solid var(--color-accent); border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
<div style="font-size: 0.72rem; font-weight: 700; color: var(--color-accent-light); font-family: var(--font-code);">.col-12.col-lg-4</div>
<div style="font-size: 0.68rem; color: var(--color-foreground); margin-top: 4px;">معلومات والاتصال</div>
</div>
</div>
</div>

</div>
</div>

---

## أخطاء شائعة

<div class="grid-2">
<div class="card card-accent">

#### أخطاء خاصك تجنبها

- كتحط `.col` مباشرة وسط `.container` (ناسي الـ `.row`)
- كتنسى باللي كلاسات نقاط التوقف كطلع **لفوق** (`col-md-6` كيطبق حتى على `lg`، `xl`، و `xxl`)
- الأعمدة وسط السطر ما كيكملوش 12 بلا قصد
- كتدير هوامش (margins) مباشرة على `.row`، الشيء اللي كيخسر انسجام الأعمدة

</div>
<div class="card card-cyan">

#### البنية الصحيحة

```html
<!-- صحيح: container -> row -> col -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">...</div>
    <div class="col-12 col-md-6">...</div>
  </div>
</div>
```

</div>
</div>

> **نصيحة:** استعمل **أدوات المطور في المتصفح** (F12) باش تشوف خطوط الـ flexbox grid والعرض المحسوب للأعمدة بوضوح.

---

<!-- _class: lead -->
<!-- _paginate: false -->

# خلاصة

<p class="subtitle">&lt;أهم النقاط في نظام Bootstrap 5.3.8 Grid /&gt;</p>

<div class="meta-box">
  - <strong>الهيكلة:</strong> <code>container</code> &rarr; <code>row</code> &rarr; <code>col</code><br>
  - <strong>12 عمود:</strong> ديما وزع 12 وحدة في كل سطر<br>
  - <strong>Mobile-first:</strong> ابدا التصميم من الصغير (<code>col-12</code>) للكبير (<code>col-lg-4</code>)<br>
  - <strong>الأدوات المساعدة:</strong> <code>g-*</code> (الفواصل)، <code>offset-*</code> (الإزاحة)، <code>order-*</code> (الترتيب)
</div>

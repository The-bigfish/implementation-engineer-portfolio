import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  DatabaseZap,
  Layers3,
  Mail,
  MapPin,
  MonitorCog,
  Phone,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import gsap from "gsap";
import ShapeGrid from "./ShapeGrid";
import "./styles.css";

const version = "v0.2.3";

const profile = {
  name: "王鑫",
  role: "OA系统项目经理 / 软件实施工程师",
  headlineTop: "让政务协同系统",
  headlineMain: "可靠上线",
  headlineBottom: "持续运转",
  summary:
    "聚焦政务 OA、信创改造、移动办公、无纸化会议与金融估值系统实施。能从需求调研、方案制定、环境部署、数据迁移、培训上线推进到验收回款，持有 PMP 认证。",
  city: "内蒙古呼和浩特市",
  phone: "+86 15247172470",
  email: "1140807063@qq.com"
};

const navItems = [
  { id: "home", label: "首页" },
  { id: "experience", label: "经历" },
  { id: "projects", label: "项目" },
  { id: "strengths", label: "优势" },
  { id: "contact", label: "联系" }
];

const metrics = [
  { value: "6+", label: "年项目实施经验" },
  { value: "20+", label: "政务及金融项目" },
  { value: "PMP", label: "项目管理认证" },
  { value: "10+", label: "信创环境组件" }
];

const projects = [
  {
    title: "内蒙古人大 NWOA 门户建设",
    time: "2024.11 - 2025.02",
    role: "项目经理",
    tags: ["门户升级", "原型设计", "用户培训"],
    description: "围绕新版门户完成需求调研、原型设计、前后端协调、实施方案设计、领导演示与用户培训。"
  },
  {
    title: "自治区工信厅无纸化会议系统",
    time: "2024.09 - 2024.12",
    role: "项目经理",
    tags: ["售前演示", "部署配置", "验收交付"],
    description: "负责售前演示、合同推进、实施计划、需求确认、产品配置、培训上线和项目收尾验收。"
  },
  {
    title: "内蒙古编办 NW 移动办公项目",
    time: "2024.09 - 2024.12",
    role: "项目经理",
    tags: ["移动办公", "档案管理", "进度汇报"],
    description: "推进移动办公系统、档案管理系统建设，拆解任务并定期向客户汇报项目进度。"
  },
  {
    title: "呼伦贝尔市 NW 移动办公项目",
    time: "2024.01 - 2024.06",
    role: "项目经理",
    tags: ["PC端对接", "启动会", "演示汇报"],
    description: "基于现有 OA 部署移动办公系统并完成 PC 端 OA 对接，推进需求确认、实施和验收。"
  },
  {
    title: "呼和浩特市发改委 OA 系统建设",
    time: "2023.04 - 2024.10",
    role: "项目实施",
    tags: ["事项审批", "数据中心", "回款沟通"],
    description: "覆盖协同办公、事项审批、公文交换、领导工作台、移动办公等模块，按期完成实施与验收。"
  },
  {
    title: "呼和浩特市农牧局 OA 系统建设",
    time: "2022.10 - 2023.03",
    role: "项目实施",
    tags: ["公文管理", "电子印章", "上线培训"],
    description: "负责前期调研、任务分解、系统配置、试运行优化、培训上线、验收材料与回款沟通。"
  },
  {
    title: "北京国际信托估值系统升级",
    time: "2021.05 - 2022.02",
    role: "实施负责人",
    tags: ["数据迁移", "估值系统", "接口对接"],
    description: "负责估值系统实施、旧系统数据迁移与日常维护，涉及新会计准则、电子对账和估值场景。"
  },
  {
    title: "政府办公厅公文平台信创改造",
    time: "2020.02 - 2020.06",
    role: "实施工程师",
    tags: ["信创服务器", "数据库迁移", "第三方适配"],
    description: "承担 RabbitMQ、Redis、应用服务部署，数据库与公文文件迁移，功能测试及第三方适配沟通。"
  },
  {
    title: "新城区智慧政务协同办公平台",
    time: "2019 - 2020",
    role: "实施工程师",
    tags: ["Linux部署", "备份脚本", "现场运维"],
    description: "完成需求确认、上线计划、Linux 裸机部署、集中培训、定时备份、调优与验收。"
  }
];

const strengths = [
  {
    icon: MonitorCog,
    title: "信创环境部署",
    text: "熟悉 CentOS、统信、银河麒麟、中科方德、Windows Server，可完成应用、数据库与关键服务部署。"
  },
  {
    icon: ClipboardList,
    title: "需求调研与方案",
    text: "能主导客户访谈、流程确认、实施方案、计划拆解、启动会与阶段汇报。"
  },
  {
    icon: DatabaseZap,
    title: "数据库与迁移",
    text: "掌握 Oracle、MySQL、达梦、神通、人大金仓，具备 SQL 与数据迁移经验。"
  },
  {
    icon: ServerCog,
    title: "中间件与运维",
    text: "接触东方通、金蝶、中创、宝蓝德、IIS、Tomcat、Nginx、Docker、RabbitMQ、Crontab。"
  },
  {
    icon: Workflow,
    title: "项目协调推进",
    text: "协调客户、前端美工、后端研发和第三方厂商，保持节奏、范围和验收目标清晰。"
  },
  {
    icon: ShieldCheck,
    title: "上线验收闭环",
    text: "覆盖培训上线、试运行优化、现场运维、系统调优、验收材料和回款沟通。"
  }
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const shellRef = useRef(null);
  const transitionRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const opening = gsap.timeline({ defaults: { ease: "expo.inOut" } });

      opening
        .set(".nav", { y: -110, opacity: 0 })
        .set(".hero-line span", { yPercent: 115, scaleY: 0.7, rotateX: 24 })
        .set(".hero-kicker, .hero-copy, .hero-actions, .hero-orbit span", { y: 42, opacity: 0 })
        .set(".opening-slab", { scaleX: 1, transformOrigin: "left center" })
        .to(".opening-slab", { scaleX: 0, duration: 1.25, stagger: 0.16 })
        .to(".nav", { y: 0, opacity: 1, duration: 0.9 }, "-=0.65")
        .to(".hero-line span", { yPercent: 0, scaleY: 1, rotateX: 0, duration: 1.35, stagger: 0.16 }, "-=0.72")
        .to(".hero-kicker, .hero-copy, .hero-actions", { y: 0, opacity: 1, duration: 1.05, stagger: 0.14 }, "-=0.72")
        .to(".hero-orbit span", { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, "-=0.78");
    });

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    const section = shellRef.current?.querySelector(`#${activeSection}`);
    if (!section) return;

    transitionRef.current?.kill();

    const context = gsap.context(() => {
      const scrollPane = section.querySelector(".projects-layout");
      if (scrollPane) scrollPane.scrollTop = 0;

      const title = section.querySelector(".section-title-mask span");
      const textItems = section.querySelectorAll(
        ".section-label, .section-heading p, .experience-copy h2, .experience-copy p, .contact-inner h2, .contact-inner p"
      );
      const cards = section.querySelectorAll(".motion-card");
      const media = section.querySelector(".reveal-media");
      const mediaPlane = section.querySelector(".media-plane");
      const animatedNodes = [title, media, mediaPlane, ...textItems, ...cards].filter(Boolean);

      gsap.killTweensOf(animatedNodes);

      const tl = gsap.timeline({ defaults: { ease: "power4.out", overwrite: "auto" } });
      transitionRef.current = tl;

      if (activeSection !== "home" && title) {
        tl.fromTo(title, { yPercent: 112, scaleX: 0.78, skewY: 3 }, { yPercent: 0, scaleX: 1, skewY: 0, duration: 0.78 }, 0);
      }

      if (media) {
        tl.fromTo(
          media,
          { opacity: 0, x: -34, scaleX: 0.9 },
          { opacity: 1, x: 0, scaleX: 1, duration: 0.74, ease: "power4.inOut" },
          0.06
        );
      }

      if (mediaPlane) {
        tl.fromTo(mediaPlane, { yPercent: 6, scale: 1.035 }, { yPercent: -3, scale: 1, duration: 0.95 }, 0.12);
      }

      if (textItems.length) {
        tl.fromTo(textItems, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.64, stagger: 0.045 }, 0.12);
      }

      if (cards.length) {
        tl.fromTo(
          cards,
          { y: 46, scaleY: 0.95, opacity: 0 },
          { y: 0, scaleY: 1, opacity: 1, duration: 0.62, stagger: 0.035, transformOrigin: "top center" },
          0.18
        );
      }
    }, shellRef);

    return () => {
      transitionRef.current?.kill();
      context.revert();
    };
  }, [activeSection]);

  const navigate = (id) => {
    if (id !== activeSection) setActiveSection(id);
  };

  return (
    <>
      <div className="global-grid" aria-hidden="true">
        <ShapeGrid
          speed={0.35}
          squareSize={48}
          direction="diagonal"
          borderColor="rgba(125, 215, 205, 0.13)"
          hoverFillColor="rgba(125, 215, 205, 0.18)"
          shape="square"
          hoverTrailAmount={6}
        />
      </div>
      <div className="opening" aria-hidden="true">
        <span className="opening-slab" />
        <span className="opening-slab" />
        <span className="opening-slab" />
      </div>
      <Nav activeSection={activeSection} onNavigate={navigate} />
      <main className="site-shell" ref={shellRef}>
        <Hero active={activeSection === "home"} onNavigate={navigate} />
        <Experience active={activeSection === "experience"} />
        <Projects active={activeSection === "projects"} />
        <Strengths active={activeSection === "strengths"} />
        <Contact active={activeSection === "contact"} />
      </main>
    </>
  );
}

function Nav({ activeSection, onNavigate }) {
  return (
    <nav className="nav">
      <button className="brand" type="button" onClick={() => onNavigate("home")}>
        <span className="brand-mark">WX</span>
        <span>{profile.name}</span>
      </button>
      <div className="nav-links" aria-label="页面导航">
        {navItems.map((item) => (
          <button
            className={activeSection === item.id ? "is-current" : ""}
            type="button"
            key={item.id}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <a className="nav-cta" href={`mailto:${profile.email}`}>
        <Mail size={18} />
        联系我
      </a>
    </nav>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="section-title-mask" aria-hidden="true">
      <span>{children}</span>
    </div>
  );
}

function Hero({ active, onNavigate }) {
  return (
    <section className={`hero panel-section ${active ? "is-active" : ""}`} id="home">
      <div className="screen-inner hero-layout">
        <div className="hero-content">
          <div className="hero-kicker">
            <Sparkles size={18} />
            Government OA · Xinchuang · Delivery
          </div>
          <h1>
            <span className="hero-line">
              <span>{profile.headlineTop}</span>
            </span>
            <strong className="hero-line hero-emphasis">
              <span>{profile.headlineMain}</span>
            </strong>
            <span className="hero-line">
              <span>{profile.headlineBottom}</span>
            </span>
          </h1>
          <p className="hero-copy">{profile.summary}</p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => onNavigate("projects")}>
              查看项目
              <ArrowUpRight size={20} />
            </button>
            <a className="secondary-button" href={`tel:${profile.phone}`}>
              <Phone size={18} />
              {profile.phone}
            </a>
          </div>
        </div>
        <div className="hero-orbit" aria-label="职业关键词">
          <span>政务 OA</span>
          <span>信创改造</span>
          <span>系统上线</span>
          <span>项目管理</span>
        </div>
      </div>
    </section>
  );
}

function Experience({ active }) {
  return (
    <section className={`panel-section ${active ? "is-active" : ""}`} id="experience">
      <SectionTitle>PROFILE</SectionTitle>
      <div className="screen-inner experience-grid">
        <div className="identity-panel reveal-media motion-card">
          <div className="media-plane" />
          <div className="identity-top">
            <span className="identity-mark">WX</span>
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
            </div>
          </div>
          <div className="identity-core">
            <Layers3 size={34} />
            <p>政务 OA · 信创改造 · 移动办公 · 金融估值</p>
          </div>
          <div className="identity-stack">
            {["Oracle", "MySQL", "达梦", "Tomcat", "Docker", "RabbitMQ", "Nginx", "Kettle"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="identity-footer">
            <div>
              <span>Certification</span>
              <strong>PMP</strong>
            </div>
            <div>
              <span>Focus</span>
              <strong>Delivery</strong>
            </div>
          </div>
        </div>
        <div className="experience-copy">
          <span className="section-label">PROFILE</span>
          <h2>把业务需求、系统能力和交付节奏拉到同一条线上。</h2>
          <p>
            我是{profile.name}，目前定位为{profile.role}。简历项目覆盖自治区政府办公厅、党委组织部、人大、工信厅、发改委、农牧局等政务单位，也参与过信托估值系统升级等金融行业项目。工作中关注客户真实流程、国产化环境适配、系统配置质量、上线风险与验收闭环，能够从实施细节推进到项目结果。
          </p>
          <div className="contact-strip">
            <span>
              <MapPin size={18} />
              {profile.city}
            </span>
            <span>
              <Phone size={18} />
              {profile.phone}
            </span>
            <span>
              <Mail size={18} />
              {profile.email}
            </span>
          </div>
          <div className="metric-grid">
            {metrics.map((item) => (
              <div className="metric motion-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ active }) {
  return (
    <section className={`panel-section projects-section ${active ? "is-active" : ""}`} id="projects">
      <SectionTitle>PROJECTS</SectionTitle>
      <div className="screen-inner projects-layout">
        <div className="section-heading">
          <div>
            <span className="section-label">SELECTED PROJECTS</span>
            <h2>精选项目</h2>
          </div>
          <p>从政务 OA、信创改造到金融估值系统，沉淀可复用的交付方法。继续向下滚动可查看完整项目经历。</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card motion-card" key={project.title}>
              <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="project-meta">
                <span>{project.time}</span>
                <span>{project.role}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="project-more motion-card">
          <span className="project-scroll-hint">
            <BriefcaseBusiness size={18} />
            已展示完整项目经历
          </span>
        </div>
      </div>
    </section>
  );
}

function Strengths({ active }) {
  return (
    <section className={`panel-section ${active ? "is-active" : ""}`} id="strengths">
      <SectionTitle>CAPABILITIES</SectionTitle>
      <div className="screen-inner strengths-layout">
        <div className="section-heading">
          <div>
            <span className="section-label">CAPABILITIES</span>
            <h2>个人优势</h2>
          </div>
        </div>
        <div className="strength-grid">
          {strengths.map(({ icon: Icon, title, text }) => (
            <article className="strength-card motion-card" key={title}>
              <div className="strength-icon">
                <Icon size={26} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ active }) {
  return (
    <section className={`panel-section ${active ? "is-active" : ""}`} id="contact">
      <SectionTitle>CONTACT</SectionTitle>
      <div className="screen-inner contact-inner">
        <div>
          <span className="section-label">CONTACT</span>
          <h2>期待参与更复杂、更有结果感的系统交付。</h2>
          <p>如果你正在寻找一位熟悉政务 OA、信创改造、项目管理与现场实施的软件实施工程师，欢迎联系我。</p>
        </div>
        <div className="contact-actions motion-card">
          <a className="primary-button" href={`mailto:${profile.email}`}>
            <Mail size={20} />
            {profile.email}
          </a>
          <a className="secondary-button" href={`tel:${profile.phone}`}>
            <Phone size={19} />
            {profile.phone}
          </a>
        </div>
        <div className="closing-line motion-card">
          <BarChart3 size={18} />
          Implementation · Delivery · Reliability · {version}
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);

export const roadmapData = {
    initialNodes: [
        {
            "data": {
                "description": "Your current situation.  Ready to start learning and building a career.",
                "detailedDescription": "This is where you are now.  You're interested in becoming a Python developer and have decided to begin your journey. Consider your existing skills and experience that may be transferable. This node represents your starting point before you begin any learning or project work.",
                "icon": "Briefcase",
                "label": "Starting Point - Career Roadmap",
                "nextSteps": [
                    "Learn Python Basics",
                    "Learn Web Development",
                    "Learn Machine Learning"
                ],
                "tasks": [
                    "Identify your strengths and weaknesses",
                    "Define your career goals in detail",
                    "Research potential career paths in Python development",
                    "Create a personal learning plan",
                    "Set realistic milestones and deadlines"
                ],
                "timeEstimate": "1 week"
            },
            "id": "Starting Point",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Gain fundamental knowledge of Python programming.",
                "detailedDescription": "This stage involves learning the basics of the Python language. Focus on fundamental concepts such as data types, control flow, functions, and object-oriented programming (OOP). Practice writing simple programs to reinforce learning.",
                "icon": "Book",
                "label": "Learn Python Basics",
                "nextSteps": [
                    "Intermediate Python",
                    "Learn Data Structures and Algorithms",
                    "Learn Web Development",
                    "Learn Machine Learning"
                ],
                "tasks": [
                    "Watch a youtube video on python basics",
                    "Create a simple python program yourself",
                    "Study OOPS concepts in python",
                    "Explore different libraries in python like pygame, etc",
                    "Practice with online coding challenges"
                ],
                "timeEstimate": "2 months"
            },
            "id": "Learn Python Basics",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Deepen your Python knowledge.",
                "detailedDescription": "Build upon your foundation by focusing on intermediate-level concepts such as file handling, exception handling, working with databases, and more advanced OOP principles.  Work on increasingly complex coding challenges.",
                "icon": "Code",
                "label": "Intermediate Python",
                "nextSteps": [
                    "Advanced Python"
                ],
                "tasks": [
                    "Practice with more complex coding problems on platforms like HackerRank or LeetCode",
                    "Build a simple CRUD application",
                    "Work with external APIs using Python's requests library",
                    "Learn about testing and debugging in Python",
                    "Implement a program utilizing design patterns"
                ],
                "timeEstimate": "3 months"
            },
            "id": "Intermediate Python",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Master essential data structures and algorithms for efficient programming.",
                "detailedDescription": "Learn about fundamental data structures like lists, stacks, queues, trees, and graphs. Understand how to choose appropriate algorithms for problem-solving and understand Big O notation.  Practice implementing and analyzing algorithms.",
                "icon": "Calculator",
                "label": "Learn Data Structures and Algorithms",
                "nextSteps": [
                    "Advanced Python"
                ],
                "tasks": [
                    "Practice implementing various data structures in Python",
                    "Learn and apply common algorithms (sorting, searching)",
                    "Analyze algorithm efficiency using Big O notation",
                    "Solve algorithm-based coding problems on platforms like LeetCode",
                    "Study algorithm design techniques"
                ],
                "timeEstimate": "2 months"
            },
            "id": "Learn Data Structures and Algorithms",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Become proficient in advanced Python techniques.",
                "detailedDescription": "Dive into advanced concepts such as multithreading, asynchronous programming, metaclasses, decorators and more. Understand the Python Global Interpreter Lock (GIL) and its implications.",
                "icon": "Flask",
                "label": "Advanced Python",
                "nextSteps": [
                    "Python Projects"
                ],
                "tasks": [
                    "Learn and practice multithreading and multiprocessing in Python",
                    "Implement an asynchronous program using asyncio",
                    "Explore and use Python decorators and metaclasses",
                    "Learn about Python's GIL and its limitations",
                    "Build a more complex project to showcase your skills"
                ],
                "timeEstimate": "4 months"
            },
            "id": "Advanced Python",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Build a portfolio of Python projects.",
                "detailedDescription": "Apply your skills by creating a variety of Python projects tailored to showcase your abilities to potential employers.  Consider project ideas that demonstrate proficiency in various Python libraries and tools.",
                "icon": "Package",
                "label": "Python Projects",
                "nextSteps": [
                    "Job Applications"
                ],
                "tasks": [
                    "Develop a web application with a framework like Flask or Django",
                    "Create a data analysis project using libraries like Pandas and NumPy",
                    "Build a machine learning project using Scikit-learn or TensorFlow",
                    "Develop a game using Pygame",
                    "Document all projects with thorough documentation and deploy to Github"
                ],
                "timeEstimate": "6 months"
            },
            "id": "Python Projects",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Apply for relevant job positions.",
                "detailedDescription": "Craft compelling resumes and cover letters, tailor your applications to specific job descriptions, and practice interviewing skills.  Network with professionals and attend industry events.",
                "icon": "Users",
                "label": "Job Applications",
                "nextSteps": [
                    "Job Offers"
                ],
                "tasks": [
                    "Create a professional resume and portfolio",
                    "Tailor applications to individual job requirements",
                    "Practice answering common interview questions",
                    "Network with industry professionals on LinkedIn and other platforms",
                    "Research companies and roles that match your skills and interests"
                ],
                "timeEstimate": "2 months"
            },
            "id": "Job Applications",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Receive and evaluate job offers.",
                "detailedDescription": "Carefully review and compare job offers, negotiate salary and benefits, and make an informed decision based on your career goals and preferences.",
                "icon": "DollarSign",
                "label": "Job Offers",
                "nextSteps": [
                    "Python Developer"
                ],
                "tasks": [
                    "Negotiate salary and benefits",
                    "Research company culture and values",
                    "Consider long-term career growth opportunities",
                    "Accept an offer that best aligns with your goals",
                    "Prepare for your first day on the job"
                ],
                "timeEstimate": "1 month"
            },
            "id": "Job Offers",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Successfully launch your career as a Python Developer.",
                "detailedDescription": "Congratulations! You have successfully completed your journey and launched your career as a Python developer. This is your end goal.  Remember that continuous learning and skill development are key to long-term success.",
                "icon": "Briefcase",
                "label": "Python Developer",
                "nextSteps": [],
                "tasks": [
                    "Start your new job",
                    "Continue learning and developing your skills",
                    "Network with colleagues and industry professionals",
                    "Stay updated with the latest technologies and trends",
                    "Contribute to open-source projects"
                ],
                "timeEstimate": "Ongoing"
            },
            "id": "Python Developer",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Learn to develop web applications using Python.",
                "detailedDescription": "This path focuses on web development using Python. You'll learn about frameworks such as Flask or Django. Practice building web applications to improve your skills.",
                "icon": "Server",
                "label": "Learn Web Development",
                "nextSteps": [
                    "Web Development Projects"
                ],
                "tasks": [
                    "Learn the basics of web development concepts such as HTML, CSS and JavaScript",
                    "Learn how to set up a web server",
                    "Learn about Python frameworks such as Flask or Django",
                    "Build small web applications using Flask or Django",
                    "Practice working with databases such as MySQL or PostgreSQL"
                ],
                "timeEstimate": "3 months"
            },
            "id": "Learn Web Development",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Build your portfolio of web development projects.",
                "detailedDescription": "Create a variety of web applications to showcase your skills to potential employers.  Include applications that leverage different technologies and methodologies, including databases and APIs.",
                "icon": "Cloud",
                "label": "Web Development Projects",
                "nextSteps": [
                    "Job Applications"
                ],
                "tasks": [
                    "Create a personal website or portfolio",
                    "Build an e-commerce web application",
                    "Develop a blog application with user authentication",
                    "Build a REST API using Flask or Django",
                    "Practice deploying your applications to cloud platforms such as AWS or Google Cloud"
                ],
                "timeEstimate": "4 months"
            },
            "id": "Web Development Projects",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Learn to apply machine learning techniques using Python.",
                "detailedDescription": "Gain knowledge of machine learning algorithms, techniques and libraries used in Python.  Learn to implement different models and work with data sets.",
                "icon": "Chart",
                "label": "Learn Machine Learning",
                "nextSteps": [
                    "Machine Learning Projects"
                ],
                "tasks": [
                    "Learn basic machine learning concepts such as supervised and unsupervised learning",
                    "Learn about different machine learning algorithms such as linear regression, logistic regression, and decision trees",
                    "Work with Python libraries such as Scikit-learn and TensorFlow",
                    "Learn how to preprocess data",
                    "Implement different machine learning models and evaluate their performance"
                ],
                "timeEstimate": "4 months"
            },
            "id": "Learn Machine Learning",
            "type": "customNode"
        },
        {
            "data": {
                "description": "Build your portfolio of Machine Learning projects.",
                "detailedDescription": "Create a variety of machine learning projects to showcase your skills to potential employers.  Consider project ideas that demonstrate different machine learning techniques, and involve real datasets.",
                "icon": "Code",
                "label": "Machine Learning Projects",
                "nextSteps": [
                    "Job Applications"
                ],
                "tasks": [
                    "Build a machine learning model to predict customer churn",
                    "Create a model to classify images",
                    "Build a recommendation system",
                    "Develop a natural language processing project",
                    "Practice deploying your models to cloud platforms such as AWS or Google Cloud"
                ],
                "timeEstimate": "6 months"
            },
            "id": "Machine Learning Projects",
            "type": "customNode"
        }
    ],
    initialEdges: [
        {
            "animated": false,
            "id": "fromStartingPointToLearnPythonBasics",
            "source": "Starting Point",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Learn Python Basics",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromLearnPythonBasicstoIntermediatePython",
            "source": "Learn Python Basics",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Intermediate Python",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromLearnPythonBasicstoLearnDataStructures",
            "source": "Learn Python Basics",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Learn Data Structures and Algorithms",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromIntermediatePythonToAdvancedPython",
            "source": "Intermediate Python",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Advanced Python",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromLearnDataStructuresAndAlgorithmstoAdvancedPython",
            "source": "Learn Data Structures and Algorithms",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Advanced Python",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromAdvancedPythonToPythonProjects",
            "source": "Advanced Python",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Python Projects",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromPythonProjectstoJobApplications",
            "source": "Python Projects",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Job Applications",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromJobApplicationstoJobOffers",
            "source": "Job Applications",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Job Offers",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromJobOfferstoPythonDeveloper",
            "source": "Job Offers",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Python Developer",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromLearnPythonBasicstoLearnWebDevelopment",
            "source": "Learn Python Basics",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Learn Web Development",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromLearnWebDevelopmentToWebDevProjects",
            "source": "Learn Web Development",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Web Development Projects",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromWebDevProjectstoJobApplications",
            "source": "Web Development Projects",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Job Applications",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromLearnPythonBasicstoLearnMachineLearning",
            "source": "Learn Python Basics",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Learn Machine Learning",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromLearnMachineLearningToMachineLearningProjects",
            "source": "Learn Machine Learning",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Machine Learning Projects",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "id": "fromMachineLearningProjectstoJobApplications",
            "source": "Machine Learning Projects",
            "style": {
                "stroke": "#EAB308",
                "strokeWidth": 2
            },
            "target": "Job Applications",
            "type": "smoothstep"
        }
    ]
}
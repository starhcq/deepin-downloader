#include "topButton.h"
#include <QDebug>
TopButton::TopButton(QWidget *parent) : QWidget(parent)
{
    Init();
    InitConnections();
}

void TopButton::Init()
{

    QHBoxLayout *mainHlayout = new QHBoxLayout(this);
    mainHlayout->setContentsMargins(0,6,0,10);
    mainHlayout->setSpacing(10);
    m_pIconLable = new DLabel;
    QIcon logo_icon=QIcon::fromTheme("ndm_preferencesystem");
    m_pIconLable->setPixmap(logo_icon.pixmap(32,32));
    m_pIconLable->setFixedSize(36,36);
    m_pSearchEdit =new DSearchEdit();
    m_pSearchEdit->setMinimumWidth(350);
    m_pSearchEdit->setFixedHeight(36);
    //searchEdit->setFixedSize(350,36);
    m_pNewDownloadBtn = new DIconButton(this);
    m_pNewDownloadBtn->setFixedSize(36,36);
    QPixmap p = QPixmap("./images/ndm_newdownload_11px.svg");
    m_pNewDownloadBtn->setIcon(QIcon(p));

    m_pPauseDownloadBtn = new DIconButton(this);
    //pauseDownloadBtn->setFixedSize(36,36);
    m_pPauseDownloadBtn->setIcon(QIcon::fromTheme("./images/ndm_list_icon_pause_11px.svg"));
    m_pPauseDownloadBtn->setEnabled(false);
    m_pPauseDownloadBtn->setGeometry(90,0,36,36);

    m_pStartDownloadBtn = new DIconButton(this);
    m_pStartDownloadBtn->setFixedSize(36,36);
    m_pStartDownloadBtn->setIcon(QIcon::fromTheme("./images/ndm_icon_start_11px.svg"));
    m_pStartDownloadBtn->setEnabled(false);

    m_pDeleteDownloadBtn = new DIconButton(this);
    m_pDeleteDownloadBtn->setFixedSize(36,36);
    m_pDeleteDownloadBtn->setIcon(QIcon::fromTheme("./images/ndm_list_icon_delete_11px.svg"));
    m_pDeleteDownloadBtn->setEnabled(false);

    mainHlayout->addSpacing(5);
    mainHlayout->addWidget(m_pIconLable);
    mainHlayout->addSpacing(7);
    mainHlayout->addWidget(m_pPauseDownloadBtn);
    mainHlayout->addWidget(m_pStartDownloadBtn);

    mainHlayout->addWidget(m_pDeleteDownloadBtn);
    mainHlayout->addWidget(m_pNewDownloadBtn);

    mainHlayout->addWidget(m_pSearchEdit);
    //mainHlayout->addStretch();

}

void TopButton::InitConnections()
{
    connect(m_pNewDownloadBtn, &DIconButton::clicked, this, &TopButton::newDownloadBtnClicked);
    connect(m_pPauseDownloadBtn, &DIconButton::clicked, this, &TopButton::pauseDownloadBtnClicked);
    connect(m_pStartDownloadBtn, &DIconButton::clicked, this, &TopButton::startDownloadBtnClicked);
    connect(m_pDeleteDownloadBtn, &DIconButton::clicked, this, &TopButton::deleteDownloadBtnClicked);

    connect(m_pSearchEdit, &DSearchEdit::focusChanged, this, &TopButton::getSearchEditFocus);
    connect(m_pSearchEdit,&DSearchEdit::textChanged,this,&TopButton::getSearchEditTextChange);
}


void TopButton::get_table_changed(int index)
{
    if(index==1||index==2)
    {
        m_pStartDownloadBtn->setEnabled(false);
        m_pPauseDownloadBtn->setEnabled(false);
        m_pDeleteDownloadBtn->setEnabled(false);
        if(index==2)
        {
            m_pDeleteDownloadBtn->setIcon(QIcon::fromTheme("ndm_recycel_delete"));
        }
        else {
            m_pDeleteDownloadBtn->setIcon(QIcon::fromTheme("ndm_list_icon_delete"));
        }
    }
    else
    {
        m_pStartDownloadBtn->setEnabled(false);
        m_pPauseDownloadBtn->setEnabled(false);
        m_pDeleteDownloadBtn->setEnabled(false);
        m_pDeleteDownloadBtn->setIcon(QIcon::fromTheme("ndm_list_icon_delete"));


    }
}
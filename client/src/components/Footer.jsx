import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import images from '../assets/images/Images';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  max-height: 220px;
  background-color: #debe8f;
  color: white;
  overflow: hidden;
`;

const FooterContent = styled.div`
  flex: 1;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Support = styled.div`
  display: flex;
  font-weight: 600;
  align-items: center;
  text-align: center;
`;
const SupItem = styled.p`
  display: flex;
  padding: 0;
  font-size: 18px;
  align-items: center;
  text-align: center;
`;

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  font-weight: 700;
  text-align: center;
`;

const MemberBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Member = styled.li`
  display: flex;
  font-weight: 500;
  padding-bottom: 5px;
  padding: 0 7px;
`;

const BottomContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: AritaSans;
  font-weight: 600;
`;

const Footer = () => {
  const supportItem = [
    {
      name: 'TEAM 빵돌빵순',
      url: 'https://github.com/codestates-seb/seb45_main_014',
    },
  ];
  const frontMember = [
    { name: '양새결', url: 'https://github.com/YangSaekyul' },
    { name: '송상현', url: 'https://github.com/nuyhv' },
    { name: '김종호', url: 'https://github.com/JongHoSke' },
  ];
  const backMember = [
    { name: '김성현', url: 'https://github.com/tsulocalize' },
    { name: '김하민', url: 'https://github.com/kimhaming' },
    { name: '박보승', url: 'https://github.com/Alluringstar' },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <Support>
          {supportItem.map((item, idx) => (
            <SupItem className="font-bold" key={idx}>
              <Link
                to={item.url}
                className="flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={images.githublogo}
                  alt="github logo"
                  width="20px"
                  className="mr-1 mb-1"
                />
                <span>{item.name}</span>
              </Link>
              <span className="pl-2 text-base font-medium">
                (2023-08-24 ~ 09-22)
              </span>
            </SupItem>
          ))}
        </Support>
        <BottomContents>
          <MemberWrapper className="text-lg">
            <p className="flex items-center text-base">GITHUB</p>
            <MemberBox>
              <ul className="text-base flex">
                <p className="w-5">FE</p>
                {frontMember.map((item, idx) => (
                  <Member key={idx}>
                    <Link
                      to={item.url}
                      className="flex justify-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                      <img
                        src={images.githublogo}
                        alt="github logo"
                        width="20px"
                        className="h-5 ml-1"
                      />
                    </Link>
                  </Member>
                ))}
              </ul>
              <ul className="text-base flex">
                <p className="w-5">BE</p>
                {backMember.map((item, idx) => (
                  <Member key={idx}>
                    <Link
                      to={item.url}
                      className="flex justify-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                      <img
                        src={images.githublogo}
                        alt="github logo"
                        width="20px"
                        className="h-5 ml-1"
                      />
                    </Link>
                  </Member>
                ))}
              </ul>
            </MemberBox>
          </MemberWrapper>
        </BottomContents>

        <div className="flex justify-between mt-8 pt-2 border-t border-white">
          <span className="text-sm font-semibold">
            Copyright 2023 빵돌빵순. All rights reserved.
          </span>
          <Logo
            to="https://github.com/codestates-seb/seb45_main_014"
            target="_blank"
            rel="noopener noreferrer"
            className="relative top-[-65px]"
          >
            <img src={images.mainlogo} alt="main logo" width="70" />
            BBANG ORDER
          </Logo>
        </div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
